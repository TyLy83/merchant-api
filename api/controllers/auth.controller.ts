import { NextFunction, Request, Response } from "express";
import { param, query, body, check, validationResult } from "express-validator";
import IController from "../interfaces/controller.interface";

import Model from "../models/auth.model";
import Service from "../services/auth.service";
import Permission from "../services/permission.service";

import env from "../env";

class Auth extends IController {

    private saltRound: number = env.SALT_ROUND;
    private service = new Service();
    private permission = new Permission(['admin', 'super admin']);

    constructor() {
        super("/auth");
        this.initializeRoutes();
        //this.service = new Service();
    }

    protected initializeRoutes() {
        this.router.post(`${this.path}/login`, this.loginValadator, this.login);
        this.router.post(`${this.path}/register`, this.registerValidator, this.register);
        this.router.put(`${this.path}/reset`, this.resetValadator, this.resetPassword);
        this.router.get(`${this.path}/details/:id`, this.permission.authenticate, this.permission.authorize, this.getUserByIdValidator, this.getUserById)
    }

    private resetValadator = [
        body("email").notEmpty().withMessage("must not be empty"),
        body("password").notEmpty().withMessage("must not be empty")
    ];

    private loginValadator = [
        body("email").notEmpty().withMessage("must not be empty"),
        body("password").notEmpty().withMessage("must not be empty")
    ];

    private registerValidator = [
        body("email").notEmpty().withMessage("must not be empty")
            .isEmail().withMessage("invalid email"),
        body("password").notEmpty().withMessage("must not be empty")
            .isLength({ min: 8 }).withMessage("must be at least 8 chars")
            .matches(/\d/).withMessage('must contain a number'),
        // body("first_name").notEmpty().withMessage("must not be empty"),
        // body("last_name").notEmpty().withMessage("must not be empty"),
        // body("mobile").notEmpty().withMessage("must not be empty")
        //     .isNumeric().withMessage("must be mobile number")
        //     .isMobilePhone(['en-NZ']).withMessage("must be mobile number")
    ];

    private getUserByIdValidator = [
        param('id').notEmpty().withMessage("id must not be empty")
    ]

    private login = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.email = request.body.email as string;
                model.password = request.body.password as string;

                const user = await this.service.login(model);

                response.status(200).json({ ...user });

                // console.log('this.service', this.service);

                // response.status(200).json({message: 'OK'})

                // const { email, password } = request.body;

                // const query = `SELECT * FROM logins WHERE email = $1`;
                // const result = await db.query(query, [email]);

                // const user = result.rows.length > 0 ? { ...result.rows[0] } : {};

                // const matched = await bcrypt.compare(password, user.password);

                // if (matched === true)
                //     response.status(200).json({ id: user.id, email: user.email });
                // else
                //     response.status(500).json({ message: 'invalid email or password' });

            } else {

                response.status(500).json({ errors: errors.array() })

            }


        } catch (error) {

            console.log('<login error>', error);

            next(error);

        }

    }

    private register = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();
                const email: string = request.body.email;
                const password: string = request.body.password;
                const first_name: string = request.body.first_name;
                const last_name: string = request.body.last_name;
                const mobile: string = request.body.mobile;

                model.email = email;
                model.password = password;
                model.first_name = first_name;
                model.last_name = last_name;
                model.mobile = mobile;

                const result = await this.service.register(model);

                response.status(201).json({ ...result });

                // const password: string = await bcrypt.hash(str_password, this.saltRound);
                // const password = await bcrypt.hash(str_password, this.saltRound);

                // const user = await this.service.getUserByEmail(email);

                // if (user)
                //     throw new BadRequestError('email already existed');

                // model.email = email;
                // model.password = password;
                // model.first_name = first_name;
                // model.last_name = last_name;
                // model.mobile = mobile;

                // console.log('model', model);

                // response.status(201).json()

                // const result = await this.service.register(this.model);

                // console.log('result', result);

                // response.status(201).json({ ...result });


                // const { email, password, first_name, last_name, mobile } = request.body;

                // const hash = await bcrypt.hash(password, this.saltRound);

                // // console.log('hash', hash);

                // // const query = `INSERT INTO logins(email, password) VALUES($1, $2) RETURNING *`;
                // const query = `WITH login AS ( INSERT INTO logins(email, password) VALUES($1, $2) 
                //         RETURNING id, email
                //     ), 
                //     result AS (INSERT INTO contacts(login, first_name, last_name, mobile) VALUES((SELECT id FROM login), $3, $4, $5)
                //         RETURNING (SELECT id FROM login) AS id,(SELECT email FROM login) AS email, first_name, last_name, mobile
                //     )
                //     SELECT * FROM result;`;
                // const result = await db.query(query, [email, hash, first_name, last_name, mobile]);

                // response.status(201).json({ ...result.rows[0] });

            } else {

                response.status(500).json({ errors: errors.array() })

            }

        } catch (error) {

            console.log('error', error);

            next(error);

        }

    }

    private resetPassword = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.email = request.body.email as string;
                model.password = request.body.password as string;

                const result = await this.service.resetPassword(model);

                response.status(200).json({ ...result });

            } else {

                response.status(400).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }
    }

    private getUserById = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const id: number = parseInt(request.params.id as string)

                const result = await this.service.getUserById(id);

                response.status(200).json(result);

            } else {

                response.status(400).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

}

export default Auth;