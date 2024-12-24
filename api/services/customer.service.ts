import Repository from "../repositories/customer.repository";
import Order from "../repositories/order.repository";

import Model from "../models/customer.model";
import { BadRequestError, NotFoundError } from "../errors";

export default class Service {

    private repository = new Repository();
    private order = new Order();

    async add(model:Model) {

        const result = await this.repository.createRecord(model);

        if(!result)
            throw new BadRequestError();

        return result;

    }

    async get(id:number) {

        const result = await this.repository.findRecord(id);

        const orders = await this.getAllOrders(id);

        return {
            ...result,
            orders
        }

    }

    async update(model:Model) {

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

    async all(store:number) {

        const result = await this.repository.findAllCustomers(store);

        return result;

    }

    async getAllOrders(customer:number) {

        const __orders = await this.order.findAllOrders(customer);

        const promises = __orders.map(({ id }) => this.order.findRecord(id));

        const result = await Promise.all(promises);

        return result;

    }

}