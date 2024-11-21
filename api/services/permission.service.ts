import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import Repository from "../repositories/permission.repository";
import Model from "../models/auth.model";
import { BadRequestError, UnauthorizedError } from "../errors";
import env from '../env';

class Service {

    repository = new Repository();
    private permitted_roles: string[];

    constructor(roles: string[]) {
        this.permitted_roles = roles;
    }

    private permmision(user_roles: string[]) {

        let found: boolean = false;

        for (let i: number = 0; i < this.permitted_roles.length; i++) {

            let role = this.permitted_roles[i];

            if (found === true)
                break;

            for (let j: number = 0; j < user_roles.length; j++) {

                if (role === user_roles[j]) {

                    found = true;
                    break;

                }

            }

        }

        return found;

    }

    authenticate = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const header = request.headers['authorization'];
            const token = header && header.split(' ')[1];

            if (!token)
                throw new BadRequestError('no authenticated token');

            const decode = jwt.verify(token, env.JWT_SECRET) as Model;

            if (!decode)
                throw new BadRequestError('failed to verify token');

            const email: string = decode.email as unknown as string;

            const result = await this.repository.getUserByEmail(email);

            if (!result)
                throw new BadRequestError('no user found');

            next();

        } catch (error) {

            next(error);

        }

    }

    authorize = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const header = request.headers['authorization'];
            const token = header && header.split(' ')[1];

            if (!token)
                throw new UnauthorizedError('no authorized token');

            const decode = jwt.verify(token as string, env.JWT_SECRET) as Model;

            if (!decode)
                throw new UnauthorizedError('failed to verify token');

            const email: string = decode.email as unknown as string;

            const result = await this.repository.getUserRoleByEmail(email);

            if (!result)
                throw new UnauthorizedError('user does not assign any roles');

            const user_roles = result.map(({ name }) => name) as string[];

            const permitted = this.permmision(user_roles) as boolean;

            if (permitted === false)
                throw new UnauthorizedError('user not allowed');

            next();

        } catch (error) {

            next(error);

        }

    }

}

export default Service;