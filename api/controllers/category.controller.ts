import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult } from "express-validator";
import IController from "../interfaces/controller.interface";
import Service from "../services/category.service";
import Permission from "../services/permission.service";
import Model from "../models/category.model";

class Category extends IController {

    constructor() {
        super("/categories");
        this.initializeRoutes();
    }

    private service = new Service();
    private permissions = new Permission(['admin']);

    private addValidator = [
        body('name').notEmpty().withMessage('name must not be empty'),
        body('store').notEmpty().withMessage('store must not be empty')
    ];

    private editValidator = [
        param('id').notEmpty().withMessage('id must not be empty'),
        body('name').notEmpty().withMessage('name must not empty')
    ];

    private getValidator = [
        param('id').notEmpty().withMessage('id must not be empty')
    ]

    private getAllValidator = [
        query('store').notEmpty().withMessage('store must not be empty')
    ]

    private deleteValidator = [
        param('id').notEmpty().withMessage('id must not be empty')
    ]

    protected initializeRoutes() {
        this.router.get(this.path, this.getAllValidator, this.getCategories);
        this.router.get(`${this.path}/details/:id`, this.getValidator, this.getCategory);
        this.router.post(`${this.path}/add`, this.permissions.authenticate, this.permissions.authorize, this.addValidator, this.addCategory);
        this.router.put(`${this.path}/edit/:id`,this.permissions.authenticate, this.permissions.authorize, this.editValidator, this.editCategory);
        this.router.delete(`${this.path}/delete/:id`, this.permissions.authenticate, this.permissions.authorize, this.deleteValidator, this.deleteCategory);
    }

    private getCategories = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const store: number = parseInt(request.query.store as string);

            const result = await this.service.getCategories(store);

            response.json([...result]);

        } catch (err) {

            next(err);

        }

    };

    private addCategory = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.name = request.body.name as string;
                model.store = parseInt(request.body.store as string);

                const result = await this.service.addCategory(model);

                response.status(201).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private editCategory = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.id = parseInt(request.params.id as string);
                model.name = request.body.name as string;

                const result = await this.service.updateCategory(model);

                response.status(200).json({ ...result });


            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }
    }

    private getCategory = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                // const { id } = request.params;
                // const query = "SELECT id, name FROM categories WHERE id = $1";
                // const result = await db.query(query, [id]);

                const id: number = parseInt(request.params.id as string);

                const result = await this.service.getCategory(id);

                response.status(200).json({ ...result });

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private deleteCategory = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const id: number = parseInt(request.params.id as string);

                const result = await this.service.deleteCategory(id);

                response.status(200).json(result);

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

}

export default Category;