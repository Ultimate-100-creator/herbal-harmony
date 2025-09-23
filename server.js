import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import nodemailer from 'nodemailer';
import db from './database.js';
import { products as allProducts } from './constants.js';

// --- Nodemailer Setup ---
// For development, we'll use Ethereal, a fake SMTP service that lets you preview emails.
// For production, you would use a real email service like SendGrid, Mailgun, or your own SMTP server.
const createTransporter = async () => {
  // In a real app, you might have a single transporter instance.
  // For Ethereal, we create a new test account each time the server starts.
  const testAccount = await nodemailer.createTestAccount();
  console.log(
    `Ethereal test account created. Preview emails at: ${nodemailer.getTestMessageUrl(
      null,
    )}`,
  );
  console.log(`User: ${testAccount.user}, Pass: ${testAccount.pass}`);

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

// --- Email Sending Functions ---
const sendOrderConfirmationEmail = async (orderData) => {
  const transporter = await createTransporter();
  const mailOptions = {
    from: '"Supplementiarx" <no-reply@supplementiarx.com>',
    to: orderData.customer.email,
    subject: `Order Confirmation #${orderData.id}`,
    html: `<h1>Thank you for your order!</h1><p>Hi ${orderData.metadata.name},</p><p>We've received your order #${orderData.id} and are getting it ready.</p><h3>Order Summary:</h3><ul>${orderData.metadata.cartItems.map((item) => `<li>${item.name} (x${item.quantity})</li>`).join('')}</ul><p><b>Total:</b> ${new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(orderData.amount / 100)}</p><p>We'll notify you again once your order has shipped.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

const sendOrderCancellationEmail = async (orderId, customerEmail, customerName) => {
  const transporter = await createTransporter();
  const mailOptions = {
    from: '"Supplementiarx" <no-reply@supplementiarx.com>',
    to: customerEmail,
    subject: `Order Cancelled #${orderId}`,
    html: `<h1>Your Order #${orderId} has been cancelled.</h1><p>Hi ${customerName},</p><p>As requested, we have cancelled your order. If you have already been charged, a refund will be processed shortly.</p><p>If you did not request this cancellation, please contact our support team immediately.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Cancellation email sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending cancellation email:', error);
  }
};

const app = express();
const port = 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from your React app
}));
app.use(express.json());

// Verification Endpoint
app.post('/api/verify-payment', async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ message: 'Payment reference is required' });
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, data } = response.data;

    if (status && data.status === 'success') {
      // Payment is successful. Save the order to the database.
      const transaction = db.prepare('BEGIN');
      transaction.run();

      try {
        const insertOrderStmt = db.prepare(
          'INSERT INTO orders (paystack_reference, customer_name, customer_email, customer_phone, total_amount) VALUES (?, ?, ?, ?, ?)'
        );
        const orderInfo = insertOrderStmt.run(
          data.reference,
          data.metadata.name,
          data.customer.email,
          data.metadata.phone,
          data.amount
        );
        const orderId = orderInfo.lastInsertRowid;

        const insertItemStmt = db.prepare(
          'INSERT INTO order_items (order_id, product_id, product_name, quantity, price, image_url) VALUES (?, ?, ?, ?, ?, ?)'
        );
        for (const item of data.metadata.cartItems) {
          const productDetails = allProducts.find(p => p.id === item.id);
          const price = productDetails ? productDetails.price : 0;
          const imageUrl = productDetails ? productDetails.imageUrls[0] : '';
          insertItemStmt.run(orderId, item.id, item.name, item.quantity, price * 100, imageUrl); // Store price in kobo/cents
        }

        const commit = db.prepare('COMMIT');
        commit.run();
        console.log(`Order #${orderId} saved to database.`);

        // Send confirmation email using data from Paystack
        await sendOrderConfirmationEmail({ ...data, id: orderId });

        return res.status(200).json({ message: 'Payment verified successfully', orderId });
      } catch (dbError) {
        console.error('Database Error on order save:', dbError);
        const rollback = db.prepare('ROLLBACK');
        rollback.run();
        return res.status(500).json({ message: 'Failed to save order after payment.' });
      }
    } else {
      return res.status(400).json({ message: 'Payment verification failed', data });
    }
  } catch (error) {
    console.error('Verification Error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ message: 'An error occurred during payment verification.' });
  }
});

// Get all orders
app.get('/api/orders', (req, res) => {
  try {
    const ordersStmt = db.prepare(`
      SELECT 
        id, 
        order_date as date, 
        total_amount as total, 
        status 
      FROM orders 
      ORDER BY order_date DESC
    `);
    const orders = ordersStmt.all();

    const getItemsStmt = db.prepare('SELECT product_id as id, product_name as name, quantity, price, image_url FROM order_items WHERE order_id = ?');

    const ordersWithProducts = orders.map(order => {
      const products = getItemsStmt.all(order.id).map(p => ({...p, price: p.price / 100, imageUrls: [p.image_url]}));
      return { ...order, total: order.total / 100, products };
    });

    res.status(200).json(ordersWithProducts);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
});

// Get a single order
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  try {
    const orderStmt = db.prepare('SELECT id, order_date as date, total_amount as total, status FROM orders WHERE id = ?');
    const order = orderStmt.get(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const itemsStmt = db.prepare('SELECT product_id as id, product_name as name, quantity, price, image_url FROM order_items WHERE order_id = ?');
    const products = itemsStmt.all(orderId).map(p => ({...p, price: p.price / 100, imageUrls: [p.image_url]}));

    res.status(200).json({ ...order, total: order.total / 100, products, date: new Date(order.date).toISOString().split('T')[0] });
  } catch (error) {
    console.error(`Failed to fetch order #${orderId}:`, error);
    res.status(500).json({ message: 'Failed to fetch order.' });
  }
});

// New Cancellation Endpoint
app.post('/api/cancel-order/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderStmt = db.prepare('SELECT customer_name, customer_email FROM orders WHERE id = ? AND status = "Processing"');
    const order = orderStmt.get(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found or cannot be cancelled.' });
    }

    const updateStmt = db.prepare("UPDATE orders SET status = 'Cancelled' WHERE id = ?");
    updateStmt.run(orderId);

    await sendOrderCancellationEmail(orderId, order.customer_email, order.customer_name);
    res.status(200).json({ message: `Order #${orderId} has been cancelled.` });
  } catch (error) {
    console.error(`Failed to cancel order #${orderId}:`, error);
    res.status(500).json({ message: 'Failed to cancel order.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});