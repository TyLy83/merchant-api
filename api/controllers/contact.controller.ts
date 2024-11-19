import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult } from "express-validator";
import IController from "../interfaces/controller.interface";
import Service from "../services/contact.service";
import Model from "../models/contact.model";

import db from "../db";

class Contact extends IController {

    constructor() {
        super("/contacts");
        this.initializeRoutes();
        this.service = new Service();
    }

    private service: Service;

    private addValidator = [
        body('first_name').notEmpty().withMessage('first name must not be empty'),
        body('last_name').notEmpty().withMessage('last name must not be empty'),
        body('mobile').notEmpty().withMessage('mobile must not be empty'),
        body('login').notEmpty().withMessage('account id must not be empty')
    ];

    private editValidator = [
        param('id').notEmpty().withMessage('id must not be empty'),
        body('first_name').notEmpty().withMessage('first name must not be empty'),
        body('last_name').notEmpty().withMessage('last name must not be empty'),
        body('mobile').notEmpty().withMessage('mobile must not be empty')

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
        // this.router.get(this.path, this.getAllValidator, this.getContacts);
        // this.router.post(`${this.path}/add`, this.addValidator, this.addContact);
        this.router.put(`${this.path}/edit/:id`, this.editValidator, this.editContact);
        this.router.get(`${this.path}/details/:id`, this.getValidator, this.getContact);
        this.router.delete(`${this.path}/delete/:id`, this.deleteValidator, this.deleteContact);
    }

    // private getContacts = async (request: Request, response: Response, next: NextFunction) => {

    //     try {

    //         // const result = await db.query("SELECT * FROM contacts");
    //         // response.json([...result.rows]);
    //         const store: number = parseInt(request.query.store as string);

    //         const result = await this.service.getContact(store);

    //         response.status(200).json(result);

    //     } catch (err) {

    //         next(err);

    //     }

    // };

    // private addContact = async (request: Request, response: Response, next: NextFunction) => {

    //     try {

    //         const errors = validationResult(request);

    //         if (errors.isEmpty()) {

    //             // const { first_name, last_name, mobile, login } = request.body;

    //             // const query = `INSERT INTO contacts (first_name, last_name, mobile) VALUES ($1, $2, $3, $4) RETURNING *`;
    //             // const result = await db.query(query, [first_name, last_name, mobile, login]);

    //             // response.status(201).json({ ...result.rows[0] });

    //             const model = new Model();

    //             model.first_name = request.body.first_name as string;
    //             model.last_name = request.body.last_name as string;
    //             model.mobile = request.body.mobile as string;
    //             model.login = parseInt(request.body.login as string);

    //             const result = await this.service.addContact(model);

    //             response.status(201).json(result);

    //         } else {

    //             response.status(500).json({ errors: errors.array() });

    //         }

    //     } catch (error) {

    //         next(error);

    //     }

    // }

    private editContact = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.id = parseInt(request.params.id as string);
                model.first_name = request.body.first_name as string;
                model.last_name = request.body.last_name as string;
                model.mobile = request.body.mobile as string;

                const result = await this.service.editContact(model);

                response.status(200).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            console.log(error);
            
            next(error);

        }
    }

    private getContact = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                // const { id } = request.params;

                // const query = "SELECT * FROM contacts WHERE id = $1";

                // const result = await db.query(query, [id]);

                // response.status(200).json({ ...result.rows[0] });
                const id:number = parseInt(request.params.id as string);

                const result = await this.service.getContact(id);

                response.status(200).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private deleteContact = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                // const { id } = request.params;
                // const result = await db.query("DELETE FROM contacts WHERE id = $1 RETURNING *", [id]);
                // response.status(200).json(result.rows[0])
                const id:number = parseInt(request.params.id as string);

                const result = await this.service.deleteContact(id);

                response.status(200).json(result);

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

}

export default Contact;