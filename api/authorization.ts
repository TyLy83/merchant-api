import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import { BadRequestError, ForbiddenError, NotFoundError } from "./errors";
import Service from "./repositories/auth.repository";
import env from "./env";

interface DecodeToken {
    id?: string,
    email?: string
}

const authorization = async (request: Request, response: Response, next: NextFunction) => {

    const header = request.headers['authorization'];
    const token = header && header.split(' ')[1];
    const service = new Service();

    try {

        console.log('token', token);

        if (!token)
            throw new ForbiddenError('no authorized token');

        const decode = jwt.verify(token as string, env.JWT_SECRET) as DecodeToken;

        if (!decode)
            throw new ForbiddenError('failed to verify token');

        const id: number = parseInt(decode.id as string);

        const result = await service.findRecord(id);

        if (!result)
            throw new NotFoundError('no user found');

        next();

    } catch (error) {

        next(error);

    }


}

export default authorization;