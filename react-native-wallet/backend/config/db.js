
import { neon } from '@neondatabase/serverless';
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}

// create a SQL connection using our DB URL from environment variables
export const sql = neon(connectionString)


export const initDB = async () => {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255),
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log('Database initialized successfully:')
    } catch (error) {
        console.error('Error initializing DB:', error);
        process.exit(1) // Exit the process with failure
    }
}