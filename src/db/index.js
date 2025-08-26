import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL Connection
const connectPostgreSQL = async () => {
    try {
        const pool = new Pool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        });

        const client = await pool.connect();
        console.log(`\n✅ PostgreSQL connected! DB HOST: ${process.env.DB_HOST}`);
        client.release();
        return pool;
    } catch (error) {
        console.error("❌ PostgreSQL connection failed: ", error);
        process.exit(1);
    }
};

// Connect to DB
const connectDB = async () => {
    const pgPool = await connectPostgreSQL();
    return { pgPool };
};

export default connectDB;
