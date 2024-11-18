import Repostiry from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/product.variant.option.model";

class ProductVariantOptionRepository implements Repostiry {

    table: string;

    constructor() {
        this.table = "product_variant_options";
    }

    async createRecord(model: Model): Promise<Model> {

        const result = await db.query(`
                INSERT INTO ${this.table}(name, price, product_variant)
                VALUES($1, $2, $3)
                RETURNING *
            `, [model.name, model.price, model.product_variant]);

        return result.rows[0];

    }

    async findRecord(id: number): Promise<Model> {

        const result = await db.query(`
                SELECT *
                FROM ${this.table}
                WHERE id=$1
            `, [id]);

        return result.rows[0]

    }

    async updateRecord(model: Model): Promise<Model> {

        const result = await db.query(`
                UPDATE ${this.table}
                SET name=$1, price=$2
                WHERE id=$3
                RETURNING id, name, price
            `, [model.name, model.price, model.id])

        return result.rows[0];

    }

    async deleteRecord(id: number): Promise<Model> {

        const result = await db.query(`
                DELETE FROM ${this.table} 
                WHERE id=$1
                RETURNING *
            `, [id]);

            return result.rows[0];

    }

    async findAllRecords(product_variant: number): Promise<Model[]> {

        const result = await db.query(`
                SELECT *
                FROM ${this.table}
                WHERE product_variant=$1
            `, [product_variant]);

        return result.rows;

    }

}

export default ProductVariantOptionRepository;