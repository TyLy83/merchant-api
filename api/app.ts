import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { env } from "./config";
import { type Controller } from "./interfaces/controller.interface";

class App {

    private app: Application;

    constructor(controllers: Controller[]) {

        this.app = express();
        this.initializeControllers(controllers);
        this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        // this.app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
        // this.app.use(cookieParser());
    }

    private initializeControllers(controllers: Controller[]) {

        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });

        this.app.use("/", (_: Request, res: Response) => {

            res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));

        });

    }

    public listen() {

        this.app.listen(env.PORT, () => {
            console.log(`[server]: Server is running at http://localhost:${env.PORT}`);
        });

    }

}

export default App