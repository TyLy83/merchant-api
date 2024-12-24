import IRepository from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/order.variant.option";

class Repository implements IRepository {

    table: string;
    private joined_table:string;

    constructor() {
        this.table = "order_variants";
        this.joined_table = "product_variant_options"
    }

    async createRecord(model: Model) {

        const result = await db.query(`
            INSERT INTO ${this.table}(order_variant, product_variant_option)
            VALUES($1, $2)
            RETURNING *
            `,
            [model.order_variant, model.product_variant_option]);

        return result.rows[0];

    }

    async findRecord(id: number) {

        const result = await db.query(`
            SELECT ${this.table}.id, ${this.joined_table}.name, ${this.joined_table}.price
            FROM ${this.table}
            JOIN ${this.joined_table}
            ON ${this.joined_table}.id=${this.table}.product_variant_option
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
            [model.product_variant_option, model.id]);

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

    async findAllVariantOptions(order_variant: number) {

        const result = await db.query(`
            SELECT ${this.table}.id, 
                ${this.joined_table}.name, 
                ${this.joined_table}.price
            FROM ${this.table}
            JOIN ${this.joined_table}
            ON ${this.joined_table}.id=${this.table}.product_variant_option
            WHERE order_variant=$1
            `,
            [order_variant]);

        return result.rows;

    }

}

export default Repository;