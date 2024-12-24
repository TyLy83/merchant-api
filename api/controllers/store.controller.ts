import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult } from "express-validator";
import IController from "../interfaces/controller.interface";

import Model from "../models/store.model";
import Service from "../services/store.service";
import Permission from "../services/permission.service";

import db from "../db";

class Store extends IController {

    constructor() {
        super("/stores");
        this.initializeRoutes();
    }

    private service = new Service();
    private permission = new Permission(['user', 'admin']);

    private addValidator = [
        body('name').notEmpty().withMessage('name must not be empty'),
        body('login').notEmpty().withMessage('account id must not be empty'),
        // body('street_number').notEmpty().withMessage('street number must not be empty'),
        // body('street_name').notEmpty().withMessage('street name must not be empty'),
        // body('suburb').notEmpty().withMessage('suburb must not be empty'),
        // body('city').notEmpty().withMessage('last name must not be empty'),
        // body('country').notEmpty().withMessage('country must not be empty'),
        // body('postal_code').notEmpty().withMessage('postal code must not be empty')
    ];

    private editValidator = [
        param('id').notEmpty().withMessage('id must not be empty'),
        body('name').notEmpty().withMessage("name must not be empty")
    ];

    private getValidator = [
        param('id').notEmpty().withMessage('id must not be empty')
    ]

    private deleteValidator = [
        param('id').notEmpty().withMessage('id must not be empty')
    ]

    private getAllValidator = [
        query('login').notEmpty().withMessage('login must not be empty')
    ]

    protected initializeRoutes() {
        this.router.get(this.path, this.getAllValidator, this.getStores);
        this.router.post(`${this.path}/add`, this.permission.authenticate, this.permission.authorize, this.addValidator, this.addStore);
        this.router.put(`${this.path}/edit/:id`,this.permission.authenticate, this.permission.authorize, this.editValidator, this.editStore);
        this.router.get(`${this.path}/details/:id`, this.permission.authenticate, this.permission.authorize, this.getValidator, this.getStore);
        this.router.delete(`${this.path}/delete/:id`, this.permission.authenticate, this.permission.authorize, this.deleteValidator, this.deleteStore);
    }

    private getStores = async (request: Request, response: Response, next: NextFunction) => {

        try {

            // const result = await db.query("SELECT * FROM stores");
            // response.json([...result.rows]);

            const login: number = parseInt(request.query.login as string);
            const result = await this.service.getStores(login);

            response.status(200).json(result);

        } catch (err) {

            next(err);

        }

    };

    private addStore = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                // const { name, street_number, street_name, suburb, city, postal_code, country, login } = request.body;

                // const query = `
                //     WITH store AS(
                //         INSERT INTO stores(name, login) 
                //         VALUES($2, $1)
                //         RETURNING id, name
                //     ),
                //     result AS (
                //         INSERT INTO locations(street_number, street_name, suburb, city, country, postal_code, store) 
                //         VALUES($3, $4, $5, $6, $7, $8, (SELECT id FROM store))
                //         RETURNING (SELECT id FROM store) AS id, (SELECT name FROM store) AS name,
                //             street_number, street_name, suburb, city, country, postal_code
                //     )
                //     SELECT * FROM result;
                // `;
                // const result = await db.query(query, [login, name, street_number, street_name, suburb, city, country, postal_code]);

                // response.status(201).json({ ...result.rows[0] });

                const model = new Model();

                model.name = request.body.name;
                model.login = request.body.login;

                const result = await this.service.addStore(model);

                response.status(201).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private editStore = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.id = parseInt(request.params.id as string)
                model.name = request.body.name;
2
                const result = await this.service.editStore(model);

                response.status(200).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }
    }

    private getStore = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const id: number = parseInt(request.params.id as string)

                const result = await this.service.getStore(id);

                response.status(200).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private deleteStore = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                // const { id } = request.params;

                // const result = await db.query("DELETE FROM stores WHERE id = $1 RETURNING *", [id]);

                // response.status(200).json(result.rows[0])


                const id: number = parseInt(request.params.id as string)

                const result = await this.service.deleteStore(id);

                response.status(201).json(result);

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

}

export default Store;