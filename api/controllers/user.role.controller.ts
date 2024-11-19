import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult } from "express-validator";
import IController from "../interfaces/controller.interface";

import Model from "../models/user.role.model";
import Service from "../services/user.role.service";

class Controller extends IController {

    service = new Service();

    constructor() {
        super("/user_roles");
        this.initializeRoutes();
    }

    protected initializeRoutes() {
        this.router.use(`${this.path}/all/:user`, this.getAllRoles);
        this.router.use(`${this.path}/add`, this.addOneValidator, this.addRole);
        this.router.use(`${this.path}/edit/:id`, this.editOneValidator, this.editRole);
        this.router.use(`${this.path}/details/:id`, this.getOneValidator, this.getRoleById);
        this.router.use(`${this.path}/delete/:id`, this.deleteOneValidator, this.deleteRole);
    }

    addOneValidator = [
        body('role').notEmpty().withMessage('role id must not be empty'),
        body('login').notEmpty().withMessage('user id must not be empty')
    ]

    getOneValidator = [
        param('id').notEmpty().withMessage('role id must not be empty')
    ]

    editOneValidator = [
        param('id').notEmpty().withMessage('role id must not be empty'),
        body('role').notEmpty().withMessage('role id must not be empty'),
        body('login').notEmpty().withMessage('user id must not be empty')
    ]

    deleteOneValidator = [
        param('id').notEmpty().withMessage('role id must not be empty')
    ]

    private getAllRoles = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const user: number = parseInt(request.params.user as string);
                const result = await this.service.getAllRoleByUserId(user);

                response.status(200).json(result);

            } else {

                response.status(400).json({ errors })

            }

        } catch (error) {

            next(error);

        }

    }

    private addRole = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.role = parseInt(request.body.role as string);
                model.login = parseInt(request.body.login as string);

                const result = await this.service.addUserRole(model);

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

                const result = await this.service.getUserRoleById(id);

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
                model.role = parseInt(request.body.role as string);
                model.login = parseInt(request.body.login as string);


                const result = await this.service.updateUserRole(model);

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

                const result = await this.service.deleteUserRole(id);

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