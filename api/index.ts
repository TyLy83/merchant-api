import express, { Express, Request, Response, NextFunction } from "express";
import { env } from "./config";

import db from "./db";

const app: Express = express();
const port = env.PORT || 4000;


app.get("/products", async (req: Request, res: Response, next: NextFunction) => {
    
    try {

        const result = await db.query("SELECT * FROM products");
        const users = result.rows;

        res.json(users);

    } catch (err) {

        next(err);
    }

});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});