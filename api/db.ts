import { Pool } from "pg";

import { env } from "./config";

// import dotenv from "dotenv";

// dotenv.config();


const pool = new Pool({
    host: env.POSTGRES_HOST,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    port: env.POSTGRES_PORT,
    idleTimeoutMillis: 30000,
  });
  
  export default pool;