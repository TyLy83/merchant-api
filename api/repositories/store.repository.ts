import IReposity from "../interfaces/repository.interface";
import Model from "../models/store.model";
import db from "../db";
import { BadRequestError, NotFoundError } from "../errors";

class StoreRepository implements IReposity {

    table: string;

    constructor() {
        this.table = "stores";
    }

    async createRecord(model: Model): Promise<Model> {

        const result = await db.query(`
            INSERT INTO ${this.table} (name, login)
            VALUES($1, $2)
            RETURNING *
            `, [model.name, model.login]);

        return result.rows[0];

    }
    
    async findRecord(id: number): Promise<Model> {

        const result = await db.query(`
            SELECT id, name 
            FROM ${this.table}
            WHERE id = $1
            `, [id]);

        return result.rows[0];

    }

    async updateRecord(model: Model): Promise<Model> {

        const result = await db.query(`
            UPDATE ${this.table}
            SET name=$2
            WHERE id = $1
            RETURNING *
            `, [model.id, model.name]);

        return result.rows[0];
    }
    
    async deleteRecord(id: number): Promise<Model> {

        const result = await db.query(`
            DELETE FROM ${this.table}
            WHERE id = $1
            RETURNING *
            `, [id]);

        return result.rows[0];
    }

    async getStoreByLogin(login:number): Promise<Model[]> {

        const result = await db.query(`
            SELECT id, name 
            FROM ${this.table}
            WHERE login = $1
            `, [login]);

        return result.rows;

    }

    // TO DO: add extra functions

}

export default StoreRepository;