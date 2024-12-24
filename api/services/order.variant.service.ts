import Repository from "../repositories/order.variant.repository";
import Option from "./order.variant.option.service";

import Model from "../models/order.variant.model";
import { BadRequestError, NotFoundError } from "../errors";

export default class Service {

    private repository = new Repository();
    private options = new Option();

    async add(model: Model) {

        const result = await this.repository.createRecord(model);

        if(!result)
            throw new BadRequestError();

        return result;

     }

    async get(id: number) {

        const result = await this.repository.findRecord(id);

        if(!result)
            throw new NotFoundError();

        const order_variant_options = await this.options.all(id);

        return {
            ...result,
            order_variant_options
        }

     }

    async update(model: Model) {

        const id = model.id as number;

        const record = await this.repository.findRecord(id);

        if(!record)
            throw new NotFoundError();

        const result = await this.repository.updateRecord(model);

        return result;


     }

    async delete(id: number) {

        const record = await this.repository.findRecord(id);

        if(!record)
            throw new NotFoundError();

        const result = await this.repository.deleteRecord(id);

        return result;

     }

    async all(order: number) {

        const result = await this.repository.findAllVariants(order);

        return result;

    }

}