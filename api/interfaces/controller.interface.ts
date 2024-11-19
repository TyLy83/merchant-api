import { Router } from "express";

abstract class IController {

    public router: Router;

    constructor(protected path: string) {
        this.router = Router();
    }

    protected abstract initializeRoutes(): void;
    
}

export default IController;