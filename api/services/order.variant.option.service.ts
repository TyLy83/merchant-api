import Repository from "../repositories/order.variant.option.repository";
import Model from "../models/order.variant.option";
import { BadRequestError } from "../errors";

export default class Service {

    private repository = new Repository();

    async add(model: Model) {

        const result = await this.repository.createRecord(model);

        if(!result)
            throw new BadRequestError();

        return result;

    }

    async get(id: number) {

        const result = await this.repository.findRecord(id);

        if(!result)
            throw new BadRequestError();

        return result;

     }

    async update(model: Model) {

        const result = await this.repository.updateRecord(model);

        if(!result)
            throw new BadRequestError();

        return result;

     }

    async delete(id: number) {

        const result = await this.repository.deleteRecord(id);

        if(!result)
            throw new BadRequestError();

        return result;

    }

    async all(variant: number) {

        const result = await this.repository.findAllVariantOptions(variant);

        if(!result)
            throw new BadRequestError();

        return result;

    }

}