import { Pool } from "pg";
import { env } from "./config";


const pool = new Pool({
	host: env.POSTGRES_HOST,
	user: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	database: env.POSTGRES_DATABASE,
	port: env.POSTGRES_PORT,
	idleTimeoutMillis: 30000,
});

// TO DEPLOY TO VERCEL
// const pool = new Pool({
// 	connectionString: env.POSTGRES_URL,
// });

export default pool;