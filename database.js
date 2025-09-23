import { DatabaseSync } from 'node:sqlite';

// Use a file-based database. ':memory:' is also an option.
const db = new DatabaseSync('supplementiarx.db');
console.log(`Database opened at ${db.location()}`);

export function initDb() {
  console.log('Initializing database schema...');
  // Use a transaction to ensure all or nothing
  const transaction = db.prepare('BEGIN');
  transaction.run();

  try {
    // Create orders table
    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        paystack_reference TEXT NOT NULL UNIQUE,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT,
        total_amount INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'Processing',
        order_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create order_items table
    db.exec(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price INTEGER NOT NULL,
        image_url TEXT,
        FOREIGN KEY (order_id) REFERENCES orders (id)
      );
    `);

    const commit = db.prepare('COMMIT');
    commit.run();
    console.log('Database schema initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    const rollback = db.prepare('ROLLBACK');
    rollback.run();
  }
}

export default db;