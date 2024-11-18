import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult, FieldValidationError } from "express-validator";
import { Controller } from "../interfaces/controller.interface";

import Model from "../models/product.variant.model";

import Service from "../services/product.variant";

class ProductVariant extends Controller {

    private service;

    private getAllValidator = [
        query('product').notEmpty().withMessage('product id must not be empty')
    ];

    private addValidator = [
        body('name').notEmpty().withMessage('name must not be empty'),
        body('price').notEmpty().withMessage('price must not be empty'),
        body('store').notEmpty().withMessage('store must not be empty'),
        body('category.name').notEmpty().withMessage('category name must not be empty')
    ];

    private editValidator = [
        param('id').notEmpty().withMessage('id must not be empty'),
        body('price').notEmpty().withMessage('price must not be empty'),
        body('category.name').notEmpty().withMessage('category name must not be empty')
    ];

    private getValidator = [
        param('id', 'variant id must not be empty').notEmpty().escape()
    ];

    private deleteValidator = [
        param('id', 'Product id must not be empty').notEmpty().escape()
    ];

    constructor() {
        super("/product_variants");
        this.initializeRoutes();

        this.service = new Service();
    }

    protected initializeRoutes() {
        this.router.get(this.path, this.getAllValidator, this.getProductVariants);
        this.router.post(`${this.path}/add`, this.addValidator, this.addProductVariant);
        this.router.put(`${this.path}/edit/:id`, this.editValidator, this.editProductVariant);
        this.router.get(`${this.path}/details/:id`, this.getValidator, this.getProductVariant);
        this.router.delete(`${this.path}/delete/:id`, this.deleteValidator, this.deleteProductVariant);
    }

    private getProductVariants = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const product: number = parseInt(`${request.query.product}`);

            const product_varaints = await this.service.getProductVariants(product);

            response.status(200).json([...product_varaints]);

        } catch (error) {

            next(error);

        }

    };

    private addProductVariant = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const model = new Model();

            model.name = request.body.name as string;
            model.max_number = request.body.max_number;
            model.min_number = request.body.min_number;
            model.product = request.body.product;

            const result = await this.service.addProductVariant(model);

            response.status(201).json({ ...result });

        } catch (error) {

            next(error);

        }

    }

    private editProductVariant = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const model = new Model();

            model.id = parseInt(`${request.params.id}`);
            model.name = request.body.name as string;
            model.max_number =  parseInt(`${request.body.max_number}`);
            model.min_number =  parseInt(`${request.body.min_number}`);

            const result = await this.service.editProductVariant(model);

            response.status(200).json({ ...result });

        } catch (error) {

            next(error);

        }

    }

    private getProductVariant = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const id: number = parseInt(`${request.params.id}`);

            const result = await this.service.getProductVariant(id);

            response.status(200).json({ ...result });

        } catch (error) {

            next(error);

        }

    }

    private deleteProductVariant = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const id: number = parseInt(`${request.params.id}`);

            const result = await this.service.deleteProductVariant(id);

            response.status(200).json({ ...result });

        } catch (error) {

            next(error);

        }
    }

}

export default ProductVariant;