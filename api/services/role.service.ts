import Repository from "../repositories/role.repository";
import Model from "../models/role.model";

import { BadRequestError, NotFoundError } from "../errors";

class Service {

    repository = new Repository();

    async addRole(model:Model) {

        const result = await this.repository.createRecord(model);

        if(!result)
            throw new BadRequestError('failed to create role');

        return result;

    }

    async getRoleById(id:number) {

        const result = await this.repository.getRecordById(id);

        if(!result)
            throw new NotFoundError('role not found');

        return result;
        
    }

    async updateRole(model:Model) {

        const result = await this.repository.updateRecord(model);

        if(!result)
            throw new BadRequestError('failed to update role');

        return result;

    }

    async deleteRoleById(id:number) {

        const result = await this.repository.deleteRecord(id);

        if(!result)
            throw new BadRequestError('failed to delete role');

        return result;

    }

    async getAllRoles() {

        const result = await this.repository.getAllRoles();

        if(!result)
            throw new NotFoundError('role not found');

        return result;

    }

}

export default Service;