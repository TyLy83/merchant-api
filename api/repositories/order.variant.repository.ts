import IRepository from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/order.variant.model";

class Repository implements IRepository {

    table: string;
    private joined_table:string;

    constructor() {
        this.table = "order_variants";
        this.joined_table = "product_variants"
    }

    async createRecord(model: Model) {

        const result = await db.query(`
            INSERT INTO ${this.table}(order, product_variant)
            VALUES($1, $2)
            RETURNING *
            `,
            [model.order, model.product_variant]);

        return result.rows[0];

    }

    async findRecord(id: number) {

        const result = await db.query(`
            SELECT 
                ${this.table}.id,
                ${this.joined_table}
            FROM ${this.table}
            JOIN ${this.joined_table}
            ON ${this.joined_table}.id=${this.table}.product_variant
            WHERE id=$1
            `, [id]);

        return result.rows[0];

    }

    async updateRecord(model: Model) {

        const result = await db.query(`
            UPDATE ${this.table}
            SET product_variant=$1
            WHERE id=$2
            RETURNING *
            `,
            [model.product_variant, model.id]);

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

    async findAllVariants(order: number) {

        const result = await db.query(`
            SELECT ${this.table}.id, 
                ${this.joined_table}.name, 
            FROM ${this.table}
            JOIN ${this.joined_table}
            ON ${this.joined_table}.id=${this.table}.product_variant
            WHERE store=$1
            `,
            [order]);

        return result.rows;

    }

}

export default Repository;