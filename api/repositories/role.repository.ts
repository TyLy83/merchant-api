import IRepository from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/role.model";
import { BadRequestError } from "../errors";

class Repository implements IRepository {
    table: string;

    constructor() {
        this.table = "roles";
    }

    async createRecord(model: Model) {

        const result = await db.query(`
            INSERT INTO ${this.table} (name)
            VALUES($1)
            RETURNING id, name
            `, [model.name]);

        return result.rows[0];

    }

    async getRecordById(id: number) {

        const result = await db.query(`
            SELECT id, name
            FROM ${this.table}
            WHERE id = $1
            `, [id]);

        return result.rows[0];


    }

    async updateRecord(model: Model) {

        const result = await db.query(`
            UPDATE ${this.table}
            SET name=$2
            WHERE id=$1
            RETURNING id, name
            `, [model.id, model.name]);

        return result.rows[0];

    }

    async deleteRecord(id: number) {

        const result = await db.query(`
            DELETE FROM ${this.table}
            WHERE id=$1
            RETURNING *
            `, [id]);

        return result.rows[0];
    }

    async getAllRoles() {

        const result = await db.query(`SELECT * FROM ${this.table}`);

        return result.rows;

    }

}

export default Repository;