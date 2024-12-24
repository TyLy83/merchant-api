import IRepository from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/product.model";

class ProductRepository implements IRepository {

    table: string;

    constructor() {
        this.table = "products";
    }

    async createRecord(model: Model): Promise<Model> {

        const result = await db.query(`
            INSERT INTO products(store, name, price, category) 
            VALUES($1, $2, $3, $4)
            RETURNING id, name, price
        `, [model.store, model.name, model.price, model.category]);

        return result.rows[0];

    }

    async findRecord(id: number): Promise<Model> {

        const result = await db.query(`
            SELECT id, name, price, category, store 
            FROM ${this.table} 
            WHERE id=$1
        `, [id]);

        return result.rows[0];

    }

    async updateRecord(model: Model): Promise<Model> {

        const result = await db.query(`
            UPDATE ${this.table}
            SET name=$2, price=$3, category=$4
            WHERE id=$1
            RETURNING id,name, price
        `, [model.id, model.name, model.price, model.category]);

        return result.rows[0];

    }

    async deleteRecord(id: number): Promise<Model> {

        const result = await db.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

        return result.rows[0];

    }

    async findAllProducts(store: number): Promise<Model[]> {

        const result = await db.query(`
            SELECT id, name, price, category 
            FROM ${this.table} 
            WHERE store=$1
        `, [store]);

        return result.rows;

    }

}

export default ProductRepository;