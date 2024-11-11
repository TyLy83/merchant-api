// import express, { Express, NextFunction, Request, Response } from "express";
// import dotenv from "dotenv";

// dotenv.config();

// const app: Express = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req: Request, res: Response) => {
//     res.send("Express + TypeScript Server");
// });

// app.post("/add", (req: Request, res: Response, next: NextFunction) => {

//     try {

//         console.log("req.body", req.body.name);

//         res.status(200).send("Post request");

//     } catch (error) {

//         next(error);

//     }

// })

// app.listen(port, () => {
//     console.log(`[server]: Server is running at http://localhost:${port}`);
// });

import App from "./app";
import ProductController from "./controllers/product";

const app = new App([new ProductController()]);

app.listen();