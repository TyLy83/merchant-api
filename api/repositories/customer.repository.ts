import IRepository from "../interfaces/repository.interface";

import db from "../db";

import Model from "../models/customer.model";

class Repository implements IRepository {

    table: string;

    constructor() {
        this.table = "customers";
    }

    async createRecord(model: Model) {

        const result = await db.query(`
            INSERT INTO ${this.table}(name, store)
            VALUES($1, $2)
            RETURNING *
            `,
            [model.name, model.store]);

        return result.rows[0];

    }

    async findRecord(id: number) {

        const result = await db.query(`
            SELECT 
                ${this.table}.id,
                ${this.table}.name
            FROM ${this.table}
            WHERE id=$1
            `, [id]);

        return result.rows[0];

    }

    async updateRecord(model: Model) {

        const result = await db.query(`
            UPDATE ${this.table}
            SET name=$1
            WHERE id=$2
            RETURNING *
            `,
            [model.name, model.id]);

        return result.rows[0];

    }

    async deleteRecord(id: number) {

        const result = await db.query(`
            DELETE FROM ${this.table}
            WHERE id=$1
            RETURNING *
            `,
            [id]);

        return result.rows[0];

    }

    async findAllCustomers(store: number) {

        const result = await db.query(`
            SELECT ${this.table}.id, 
                ${this.table}.name 
            FROM ${this.table}
            WHERE store=$1
            `,
            [store]);

        return result.rows;

    }

}

export default Repository;