import express, { Express, NextFunction, Request, Response } from "express";
import path from "path";

import { type Controller } from "./interfaces/controller";
import env from "./env";

class App {

    private app: Express;

    constructor(controllers: Controller[]) {

        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);

    }

    private initializeMiddlewares() {

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

    }

    private initializeControllers(controllers: Controller[]) {

        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });

        this.app.get("/", (req: Request, res: Response) => {

            res.sendFile(path.join(__dirname, '..', 'public', 'index.htm'));

        });

        this.app.post("/add", (req: Request, res: Response, next: NextFunction) => {

            try {

                console.log("req.body", req.body.name);

                res.status(200).send("Post request");

            } catch (error) {

                next(error);

            }

        });

    }

    public listen() {

        this.app.listen(env.PORT, () => {
            console.log(`[server]: Server is running at http://localhost:${env.PORT}`);
        });

    }

}

export default App;