import Repostiry from "../interfaces/repository.interface";
import { NotFoundError } from "../errors";
import db from "../db";
import Model from "../models/product.variant.model";

class ProductVariantRepository implements Repostiry {

    table: string;

    constructor() {
        this.table = "product_variants";
    }

    async createRecord(model: Model): Promise<Model> {

        const result = await db.query(`
                INSERT INTO ${this.table}(name, max_number, min_number, product)
                VALUES($1, $2, $3, $4)
                RETURNING id, name, max_number, min_number
            `, [model.name, model.max_number, model.min_number, model.product]);

        return result.rows[0];

    }

    async findRecord(id: number): Promise<Model> {

        const result = await db.query(`
                SELECT id, name, max_number, min_number
                FROM ${this.table}
                WHERE id=$1
            `, [id]);

        return result.rows[0]

    }

    async updateRecord(model: Model): Promise<Model> {

        const result = await db.query(`
                UPDATE ${this.table}
                SET name=$1, max_number=$2, min_number=$3
                WHERE id=$4
                RETURNING id, name, max_number, min_number
            `, [model.name, model.max_number, model.min_number, model.id])

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

    async findAllRecords(product: number): Promise<Model[]> {

        const result = await db.query(`
                SELECT id, name, max_number, min_number
                FROM ${this.table}
                WHERE id=$1
            `, [product]);

        return result.rows;

    }

}

export default ProductVariantRepository;