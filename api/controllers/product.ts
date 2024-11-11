import { NextFunction, Request, Response } from "express";
import { Controller } from "../interfaces/controller";

import db from "../db";

class Product extends Controller {

    constructor() {
        super("/products");
        this.initializeRoutes();
    }

    protected initializeRoutes() {
        this.router.get(this.path, this.getProducts);
        this.router.post(`${this.path}/add`, this.addProduct);
    }

    private getProducts = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const result = await db.query("SELECT * FROM products");
            response.json({ users: result.rows });

        } catch (err) {

            next(err);

        }

    };

    private addProduct = async (request: Request, response: Response, next: NextFunction) => {

        try {

            console.log(request.body);

            const { name } = request.body;

            const insertUser = `INSERT INTO products (name) VALUES ($1) RETURNING *`;
            const result = await db.query(insertUser, [name]);

            const createdUser = result.rows[0];
            response.json(createdUser);
            // response.status(201).json(`${name}`);

        } catch (error) {

            next(error);

        }

    }

}

export default Product