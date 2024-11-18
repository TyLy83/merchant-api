import { Pool } from "pg";
import env from "./env";

// TO DO: update .gitignore 
// TO DO: in order to update

const pool = new Pool({
	host: env.POSTGRES_HOST,
	user: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	database: env.POSTGRES_DATABASE,
	port: env.POSTGRES_PORT,
	idleTimeoutMillis: 30000,
});

// // :TO DEPLOY TO VERCEL
// // : uncomment this config for production

// const pool = new Pool({
// 	connectionString: env.POSTGRES_URL,
// });

export default pool;