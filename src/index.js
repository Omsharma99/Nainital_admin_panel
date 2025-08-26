import dotenv from 'dotenv';
import { Pool } from 'pg';
import { app } from './app.js';

// Load environment variables from .env
dotenv.config();

// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,       // RDS endpoint
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,       // RDS DB username
  password: process.env.DB_PASSWORD, // RDS DB password
  database: process.env.DB_NAME,   // RDS DB name
  max: 20,                         // max pool size (optional)
  idleTimeoutMillis: 30000,        // close idle clients after 30s
  connectionTimeoutMillis: 2000    // return error after 2s if connection fails
});

// Test DB connection
pool.connect()
  .then(client => {
    console.log('✅ Connected to AWS RDS PostgreSQL');
    client.release(); // release the client back to the pool
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
  });

// Start backend server accessible externally
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT} and accessible externally`);
});

export { pool };
