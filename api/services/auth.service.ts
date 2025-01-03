import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import Repository from "../repositories/auth.repository";
import Role from "../repositories/user.role.repository";
import Contact from "../repositories/contact.repository";
import Model from "../models/auth.model"
import { BadRequestError, NotFoundError } from "../errors";

import env from "../env";

class AuthService {

    private repository = new Repository();
    private contact = new Contact();
    private role = new Role();

    public async register(model: Model) {

        const email: string = model.email as string;
        const str_password: string = model.password as string;

        const user = await this.repository.findRecordByEmail(email);

        if (user)
            throw new BadRequestError('email already existed');

        const password: string = await bcrypt.hash(str_password, env.SALT_ROUND);

        model.password = password;

        const result = await this.repository.createRecord(model);

        return result;

    }

    public async login(model: Model) {

        const returnModel = new Model();
        const email: string = model.email as string;
        const str_password: string = model.password as string;

        const user = await this.repository.findRecordByEmail(email);

        if (!user)
            throw new BadRequestError("invalid email or password");

        const matched = await bcrypt.compare(str_password, user.password as string);

        if (!matched)
            throw new BadRequestError("Invalid email or password");

        const id: number = parseInt(user.id as unknown as string);

        const roles = await this.role.getAllRoleByUserId(id);

        const user_roles: string[] = roles.map(({ name }) => name);

        const token = jwt.sign({ id: user.id, email: user.email, user_roles }, env.JWT_SECRET, { expiresIn: "1d" })

        // user.password = undefined;

        return { 
            token, 
            user: {
                id: id,
                first_name: user.first_name,
                last_name: user.last_name
            }
        }

    }

    public async resetPassword(model: Model) {

        const updateModel = new Model();

        const email: string = model.email as string;
        const password: string = model.password as string;

        const user = await this.repository.findRecordByEmail(email);

        if (!user)
            throw new BadRequestError("invalid email or password");


        if (!password)
            throw new BadRequestError("invalid email or password");

        const hash_password = await bcrypt.hash(password, env.SALT_ROUND);

        updateModel.email = email;
        updateModel.password = hash_password;

        const result = await this.repository.updateRecord(updateModel);

        return result;

    }

    public async deleteUser(id: number) {

        const result = await this.repository.deleteRecord(id);

        return result;

    }

    public async getUserByEmail(email: string) {

        const result = this.repository.findRecordByEmail(email);

        if (!result)
            throw new NotFoundError('user not found');

        return result;

    }

    async getUserById(id: number) {

        const result = await this.repository.findRecord(id);

        if (!result)
            throw new BadRequestError('user not found');

        return result;

    }

}

export default AuthService;