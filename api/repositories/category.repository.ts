import IRepository from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/category.model";

class CategoryRepository implements IRepository {

    table: string;

    constructor() {
        this.table = "categories";
    }

    async createRecord(model: Model): Promise<Model> {

        const result = await db.query(`
            INSERT INTO ${this.table}(store, name) 
            VALUES($1, $2)
            RETURNING id, name
        `, [model.store, model.name]);

        return result.rows[0];

    }

    async findRecord(id: number): Promise<Model> {

        const result = await db.query(`
            SELECT id, name
            FROM ${this.table} 
            WHERE id=$1
        `, [id]);

        return result.rows[0];

    }

    async updateRecord(model: Model): Promise<Model> {

        const result = await db.query(`
            UPDATE ${this.table} 
            SET name=$2
            WHERE id=$1
            RETURNING id, name
        `, [model.id, model.name]);

        return result.rows[0];

    }

    async deleteRecord(id: number): Promise<Model> {

        const result = await db.query(`DELETE FROM ${this.table} WHERE id = $1 RETURNING *`, [id]);

        return result.rows[0];

    }

    async findAllCategories(store: number): Promise<Model[]> {

        const result = await db.query(`
            SELECT id, name 
            FROM ${this.table} 
            WHERE store=$1
        `, [store]);

        return result.rows;

    }

}

export default CategoryRepository;