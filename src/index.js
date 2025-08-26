import { Pool } from 'pg';
import { app } from './app.js';
import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

// 🔁 Connect to AWS RDS (PostgreSQL)
const pool = new Pool({
  host: process.env.DB_HOST,       // Your RDS endpoint
  user: process.env.DB_USER,       // DB username
  password: process.env.DB_PASSWORD, // DB password
  database: process.env.DB_NAME,   // Database name
  port: process.env.DB_PORT || 5432
});

pool.connect()
  .then(() => console.log('Connected to AWS RDS database'))
  .catch(err => console.error('Database connection error:', err));

// Start your backend server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on ${process.env.PORT || 8000}`);
});

export { pool };
