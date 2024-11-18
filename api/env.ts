// TO DO: update .gitignore file
// TO DO: to reupload
import { config } from "dotenv";
import { cleanEnv, str, email, json, port, url, num } from 'envalid'

config();

export const env = cleanEnv(process.env, {
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port({ default: 5432 }),
    POSTGRES_DATABASE: str(),
    PORT: port({ default: 4000 }),

    JWT_SECRET: str(),
    FRONTEND_URL: url(),
    SALT_ROUND: num()
});

// //:TO DEPLOY TO VERCEL 
// //: uncomment this block of code
// export const env = cleanEnv(process.env, {
//     PORT: port({ default: 4000 }),
//     POSTGRES_URL:str()
// });

export default env;