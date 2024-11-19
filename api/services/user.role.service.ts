import Repository from "../repositories/user.role.repository";
import Model from "../models/user.role.model";

import { BadRequestError, NotFoundError } from "../errors";

class Service {

    repository = new Repository();

    async addUserRole(model: Model) {

        const result = await this.repository.createRecord(model);

        if(!result)
            throw new BadRequestError('failed to create user role');

        return result;

    }

    async getUserRoleById(id: number) {

        const result = await this.repository.getRecordById(id)

        if(!result)
            throw new NotFoundError('user role not found');

        return result;

    }

    async updateUserRole(model: Model) {

        const result = await this.repository.updateRecord(model)

        if(!result)
            throw new BadRequestError('failed to update user role');

        return result;

    }

    async deleteUserRole(id: number) {

        const result = await this.repository.deleteRecord(id);

        if(!result)
            throw new BadRequestError('failed to delete user role');

        return result;

    }

    async getAllRoleByUserId(user:number) {

        const result = await this.repository.getAllRoleByUserId(user);

        if(!result)
            throw new NotFoundError("user roles not found");

        return result;
    }

}

export default Service;