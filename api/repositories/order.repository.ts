import IRepository from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/order.model";

class Repository implements IRepository {

    table: string;
    private joined_table:string;

    constructor() {
        this.table = "orders";
        this.joined_table = "products"
    }

    async createRecord(model: Model) {

        const result = await db.query(`
            INSERT INTO ${this.table}(customer, product, quantity)
            VALUES($1, $2, $3)
            RETURNING *
            `,
            [model.customer, model.product, model.quantity]);

        return result.rows[0];

    }

    async findRecord(id: number) {

        const result = await db.query(`
            SELECT 
                ${this.table}.id,
                ${this.joined_table}.name,
                ${this.joined_table}.price,
                ${this.table}.quantity
            FROM ${this.table}
            JOIN ${this.joined_table}
            ON ${this.joined_table}.id=${this.table}.product
            WHERE id=$1
            `, [id]);

        return result.rows[0];

    }

    async updateRecord(model: Model) {

        const result = await db.query(`
            UPDATE ${this.table}
            SET quantity=$1
            WHERE id=$2
            RETURNING *
            `,
            [model.quantity, model.id]);

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

    async findAllOrders(customer: number) {

        const result = await db.query(`
            SELECT ${this.table}.id, 
                products.name, 
                products.price, 
                ${this.table}.quantity 
            FROM ${this.table}
            JOIN ${this.joined_table}
            ON ${this.joined_table}.id=${this.table}.product
            WHERE customer=$1
            `,
            [customer]);

        return result.rows;

    }

}

export default Repository;