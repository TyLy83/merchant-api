import Repository from "../repositories/order.repository";
import Variant from "./order.variant.service";

import Model from "../models/order.model";
import { NotFoundError } from "../errors";

export default class Service {

    private repository = new Repository();
    private variant = new Variant();

    async add(model: Model) {

        const result = await this.repository.createRecord(model);

        return result;

    }

    async get(id: number) {

        const result = await this.repository.findRecord(id);

        const order_variants = await this.getOrderVariants(id);

        return {
            ...result,
            order_variants
        }

    }

    async update(model:Model) { 

        const id = model.id as number;

        const record = await this.repository.findRecord(id)

        if(!record)
            throw new NotFoundError();

        const result = await this.repository.updateRecord(model);

        return result;

    }

    async delete(id: number) { 

        const record = await this.repository.findRecord(id)

        if(!record)
            throw new NotFoundError();

        const result = await this.repository.deleteRecord(id);

        return result;

    }

    async all(customer:number) {

        const result = await this.repository.findAllOrders(customer);

        return result;

     }

    private async getOrderVariants(order: number) {

        const __variants = await this.variant.all(order);

        const promises = __variants.map(({ id }) => this.variant.get(id));

        const result = await Promise.all(promises);

        return result;

    }

}