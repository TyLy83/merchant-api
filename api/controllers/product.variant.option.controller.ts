import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult } from "express-validator";
import { Controller } from "../interfaces/controller.interface";

import Model from "../models/product.variant.option.model";
import Service from "../services/product.variant.option.service";

class ProductVariant extends Controller {

    private service;

    private getAllValidator = [
        query('product_variant').notEmpty().withMessage('product variant id must not be empty')
    ];

    private addValidator = [
        body('name').notEmpty().withMessage('name must not be empty'),
        body('price').notEmpty().withMessage('price must not be empty'),
        body('product_variant').notEmpty().withMessage('store must not be empty'),
    ];

    private editValidator = [
        param('id').notEmpty().withMessage('id must not be empty'),
        body('price').notEmpty().withMessage('price must not be empty'),
        body('name').notEmpty().withMessage('name must not be empty')
    ];

    private getValidator = [
        param('id').notEmpty().withMessage('id must not be empty')
    ];

    private deleteValidator = [
        param('id').notEmpty().withMessage('id must not be empty')
    ];

    constructor() {
        super("/product_variant_options");
        this.initializeRoutes();
        this.service = new Service();
    }

    protected initializeRoutes() {
        this.router.get(this.path, this.getAllValidator, this.getProductVariantOptions);
        this.router.post(`${this.path}/add`, this.addValidator, this.addProductVariantOption);
        this.router.put(`${this.path}/edit/:id`, this.editValidator, this.editProductVariantOption);
        this.router.get(`${this.path}/details/:id`, this.getValidator, this.getProductVariantOption);
        this.router.delete(`${this.path}/delete/:id`, this.deleteValidator, this.deleteProductVariantOption);
    }

    private getProductVariantOptions = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const produc_variant: number = parseInt(request.query.product_variant as string);

                const result = await this.service.getProductVariantOptions(produc_variant);

                response.status(200).json([...result]);

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    };

    private addProductVariantOption = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {
                
                const model = new Model();
                
                model.name= request.body.name;
                model.price = request.body.price;
                model.product_variant = request.body.product_variant;

                const result = await this.service.addProductVariantOption(model);

                response.status(201).json({ ...result });

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private editProductVariantOption = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.id = parseInt(request.params.id as string);
                model.name = request.body.name as string;
                model.price = parseFloat(request.body.price as string);

                const result = await this.service.editProductVariantOption(model);

                response.status(200).json({ ...result });

            } else {

                response.status(400).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private getProductVariantOption = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const id: number = parseInt(request.params.id as string);

                const result = await this.service.getProductVariantOption(id);

                response.status(200).json({ ...result });

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private deleteProductVariantOption = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const id: number = parseInt(request.params.id as string);

                const result = await this.service.deleteProductVariantOption(id);

                response.status(200).json({ ...result });

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }
    }

}

export default ProductVariant;