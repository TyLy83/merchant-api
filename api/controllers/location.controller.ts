import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult } from "express-validator";
import IController from "../interfaces/controller.interface";

// import db from "../db";
import Model from "../models/location.model";
import Service from "../services/location.service";

class Location extends IController {

    constructor() {
        super("/locations");
        this.initializeRoutes();
    }

    private service = new Service();

    private addValidator = [
        body('street_number').notEmpty().withMessage('street number must not be empty'),
        body('street_name').notEmpty().withMessage('street name must not be empty'),
        body('suburb').notEmpty().withMessage('suburb must not be empty'),
        body('city').notEmpty().withMessage('last name must not be empty'),
        body('country').notEmpty().withMessage('country must not be empty'),
        body('postal_code').notEmpty().withMessage('postal code must not be empty')
    ];

    private editValidator = [
        param('id').notEmpty().withMessage('id must not be empty'),
        body('street_number').notEmpty().withMessage('street number must not be empty'),
        body('street_name').notEmpty().withMessage('street name must not be empty'),
        body('suburb').notEmpty().withMessage('suburb must not be empty'),
        body('city').notEmpty().withMessage('last name must not be empty'),
        body('country').notEmpty().withMessage('country must not be empty'),
        body('postal_code').notEmpty().withMessage('postal code must not be empty')
    ];

    private getValidator = [
        param('id').notEmpty().withMessage('id must not be empty')
    ]

    private deleteValidator = [
        param('id').notEmpty().withMessage('id must not be empty')
    ]

    private getAllValidator = [
        query('store').notEmpty().withMessage('id must not be empty')
    ]

    protected initializeRoutes() {
        this.router.get(this.path, this.getAllValidator, this.getLocations);
        this.router.post(`${this.path}/add`, this.addValidator, this.addLocation);
        this.router.put(`${this.path}/edit/:id`, this.editValidator, this.editLocation);
        this.router.get(`${this.path}/details/:id`, this.getValidator, this.getLocation);
        this.router.delete(`${this.path}/delete/:id`, this.deleteValidator, this.deleteLocation);
    }

    private getLocations = async (request: Request, response: Response, next: NextFunction) => {

        try {

            // const result = await db.query("SELECT * FROM locations");
            // response.json([...result.rows]);

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const store: number = parseInt(request.query.store as string);

                console.log('store', store);

                const result = await this.service.getLocationByStore(store);

                response.status(200).json(result);

            } else {

                response.status(400).json({ errors: errors.array() })
            }

        } catch (err) {

            next(err);

        }

    };

    private addLocation = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                // const { first_name, last_name, mobile, login } = request.body;

                // const query = `INSERT INTO locations (first_name, last_name, mobile) VALUES ($1, $2, $3, $4) RETURNING *`;
                // const result = await db.query(query, [first_name, last_name, mobile, login]);

                // response.status(201).json({ ...result.rows[0] });
                const model = new Model();

                model.store = parseInt(request.body.store as string);
                model.postal_code = parseInt(request.body.postal_code as string);
                model.street_number = parseInt(request.body.street_number as string);
                model.street_name = request.body.street_name as string;
                model.suburb = request.body.suburb as string;
                model.city = request.body.city as string;
                model.country = request.body.country as string;

                console.log('model', model);

                const result = await this.service.addLocation(model);

                response.status(201).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private editLocation = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                // const { id } = request.params;
                // const { street_number, street_name, suburb, city, country, postal_code } = request.body;

                // const query = "UPDATE locations SET street_number= $2, street_name = $3, suburb= $4, city=$5, country=$6, postal_code=$7  WHERE id = $1 RETURNING *";

                // const result = await db.query(query, [id, street_number, street_name, suburb, city, country, postal_code]);

                // response.status(200).json({ ...result.rows[0] });

                const model = new Model();

                model.id = parseInt(request.params.id as string);
                model.store = parseInt(request.body.store as string);
                model.postal_code = parseInt(request.body.postal_code as string);
                model.street_number = parseInt(request.body.street_number as string);
                model.street_name = request.body.street_name as string;
                model.suburb = request.body.suburb as string;
                model.city = request.body.city as string;
                model.country = request.body.country as string;

                // console.log("model", model);

                const result = await this.service.editLocation(model);

                response.status(200).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }
    }

    private getLocation = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                // const { id } = request.params;

                // const query = `
                //         SELECT id, street_number, street_name, suburb, city, country, postal_code  
                //         FROM locations WHERE id = $1
                //     `;

                // const result = await db.query(query, [id]);

                // response.status(200).json({ ...result.rows[0] });
                const id:number = parseInt(request.params.id as string);

                const result = await this.service.getLocation(id);

                response.status(200).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private deleteLocation = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                // const { id } = request.params;

                // const result = await db.query("DELETE FROM locations WHERE id = $1 RETURNING *", [id]);

                // response.status(200).json(result.rows[0])

                const id:number = parseInt(request.params.id as string);

                const result = await this.service.deleteLocation(id);

                response.status(200).json(result);

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

}

export default Location;