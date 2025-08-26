import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Pool } from 'pg'; // PostgreSQL client
import { errorHandler } from "./middlewares/error.middleware.js";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Routes import
import driverRouter from './routes/driver/driver.routes.js';
import shuttleRouter from './routes/driver/shuttle.routes.js';
import userRouter from './routes/user/user.routes.js';
import merchantRouter from './routes/user/merchant.routes.js';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// AWS RDS PostgreSQL connection
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432
});

// Test DB connection
pool.connect()
    .then(() => console.log('Connected to AWS RDS successfully!'))
    .catch(err => console.error('Database connection error:', err));

// Attach DB pool to requests
app.use((req, res, next) => {
    req.pgPool = pool;
    next();
});

// Routes
app.use("/api/v1/drivers", driverRouter);
app.use("/api/v1/shuttle", shuttleRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/merchants", merchantRouter);

// Error middleware - must be last
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { app, pool };
