import pool from "../db";
import { NextFunction, Request, Response } from "express";
import { Controller } from "../interfaces/controller.interface";

class Products extends Controller {

    constructor() {
        super("/products");
        this.initializeRoutes();
    }

    protected initializeRoutes() {
        this.router.get(this.path, this.getProducts);
    }

    private getProducts = async (_: Request, response: Response, next: NextFunction) => {
        
        try {

            const result = await pool.query("SELECT * FROM products");
            response.json({ users: result.rows });

        } catch (err) {

            next(err);

        }

    };

}

export default Products