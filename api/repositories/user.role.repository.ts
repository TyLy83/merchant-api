import IRepository from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/user.role.model";
import { BadRequestError } from "../errors";

class Repository implements IRepository {

    table: string;
    role: string;

    constructor() {
        this.table = "user_roles";
        this.role = "roles"
    }

    async createRecord(model: Model) {

        const result = await db.query(`
            INSERT INTO ${this.table} (role, login)
            VALUES($1, $2)
            RETURNING id, role, login
            `, [model.role, model.login]);

        return result.rows[0];

    }

    async getRecordById(id: number) {

        const result = await db.query(`
            SELECT ${this.table}.id, ${this.role}.name
            FROM ${this.table}
            JOIN ${this.role} ON ${this.role}.id = ${this.table}.role
            WHERE ${this.table}.id = $1
            `, [id]);

        return result.rows[0];


    }

    async updateRecord(model: Model) {

        const result = await db.query(`
            UPDATE ${this.table}
            SET name=$2
            JOIN ${this.role} ON ${this.role}.id = ${this.table}.role
            WHERE ${this.table}.id=$1
            RETURNING ${this.table}.id, ${this.role}.name
            `, [model.id, model.role]);

        return result.rows[0];

    }

    async deleteRecord(id: number) {

        const result = await db.query(`
            DELETE FROM ${this.table}
            JOIN ${this.role} ON ${this.role}.id = ${this.table}.role
            WHERE ${this.table}.id=$1
            RETURNING ${this.table}.id, ${this.role}.name
            `, [id]);

        return result.rows[0];
    }

    async getAllRoleByUserId(user: number) {

        const result = await db.query(`SELECT ${this.table}.id, ${this.role}.name
            FROM ${this.table}
            JOIN ${this.role} ON ${this.role}.id = ${this.table}.role
            WHERE ${this.role}.login = $1`, [user]);

        return result.rows;

    }

}

export default Repository;