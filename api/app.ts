import express, { Express, NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import path from "path";

import IController from "./interfaces/controller.interface";
import HttpError from "./interfaces/http.error.interface";
import env from "./env";

class App {

    private app: Express;
    private options:CorsOptions = {
       origin: [env.FRONTEND_URL]
    };

    constructor(controllers: IController[]) {

        this.app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);

    }

    private initializeMiddlewares() {

        this.app.use(cors(this.options));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

    }

    private errorHandler(error: HttpError, request: Request, response: Response, next: NextFunction) {

        console.log(error.stack);
        const status: number = error.status || 500;
        const message: string = error.message || "Internal server error";

        response.status(status).json({ error: message });

    }

    private initializeControllers(controllers: IController[]) {

        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });

        this.app.use(express.static("public"));

        this.app.use(this.errorHandler);

    }

    public listen() {

        this.app.listen(env.PORT, () => {
            console.log(`Server is running at http://localhost:${env.PORT}`);
        });

    }

}

export default App;