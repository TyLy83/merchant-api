import { config } from "dotenv";
import { cleanEnv, port, str, url } from "envalid";

config();

export const env = cleanEnv(process.env, {
    // POSTGRES_USER: str(),
    // POSTGRES_PASSWORD: str(),
    // POSTGRES_HOST: str(),
    // POSTGRES_PORT: port({ default: 5432 }),
    // POSTGRES_DATABASE: str(),
    PORT: port({ default: 4000 }),

    // JWT_SECRET: str(),
    // FRONTEND_URL: url(),
    POSTGRES_URL:str()
});