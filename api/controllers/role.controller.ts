import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult } from "express-validator";
import IController from "../interfaces/controller.interface";

import Model from "../models/role.model";
import Service from "../services/role.service";

class Controller extends IController {

    service = new Service();

    constructor() {
        super("/roles");
        this.initializeRoutes();
    }

    protected initializeRoutes() {
        this.router.get(this.path, this.getAllRoles);
        this.router.get(`${this.path}/details/:id`, this.getOneValidator, this.getRoleById);
        this.router.post(`${this.path}/add`, this.addOneValidator, this.addRole);
        this.router.put(`${this.path}/edit/:id`, this.editOneValidator, this.editRole);
        this.router.delete(`${this.path}/delete/:id`, this.deleteOneValidator, this.deleteRole);
    }

    addOneValidator = [       
        body('name').notEmpty().withMessage('role name must not be empty')
    ]

    getOneValidator = [
        param('id').notEmpty().withMessage('role id must not be empty')
    ]

    editOneValidator = [
        param('id').notEmpty().withMessage('role id must not be empty'),
        body('name').notEmpty().withMessage('role name must not be empty')
    ]

    deleteOneValidator = [
        param('id').notEmpty().withMessage('role id must not be empty')
    ]

    private getAllRoles = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const result = await this.service.getAllRoles();

            response.status(200).json(result);

        } catch (error) {

            next(error);

        }

    }

    private addRole = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.name = request.body.name as string;

                const result = await this.service.addRole(model);

                response.status(200).json(result);

            } else {

                response.status(400).json({ errors });

            }

        } catch (error) {

            next(error);

        }

    }

    private getRoleById = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const id: number = parseInt(request.params.id as string);

                const result = await this.service.getRoleById(id);

                response.status(200).json(result);

            } else {

                response.status(400).json({ errors });

            }

        } catch (error) {

            next(error);

        }

    }

    private editRole = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.id = parseInt(request.params.id as string);
                model.name = request.body.name as string;

                const result = await this.service.updateRole(model);

                response.status(200).json(result);

            } else {

                response.status(400).json({ errors });

            }

        } catch (error) {

            next(error);

        }

    }

    private deleteRole = async (request: Request, response: Response, next: NextFunction) => {

        try {
            
            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const id: number = parseInt(request.params.id as string);

                const result = await this.service.deleteRoleById(id)

                response.status(200).json(result);

            } else {

                response.status(400).json({ errors });

            }

        } catch (error) {

            next(error);

        }

    }

}

export default Controller;