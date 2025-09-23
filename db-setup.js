import 'dotenv/config';
import { sql } from '@vercel/postgres';

async function setupDatabase() {
  try {
    console.log('Initializing database schema...');
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        paystack_reference TEXT NOT NULL UNIQUE,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT,
        total_amount INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'Processing',
        order_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('"orders" table created or already exists.');

    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        image_url TEXT
      );
    `;
    console.log('"order_items" table created or already exists.');
    console.log('Database schema initialized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    process.exit(1);
  }
}

setupDatabase();