import IRepository from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/auth.model";
import { BadRequestError } from "../errors";

class AuthRepository implements IRepository {

    table: string;

    constructor() {
        this.table = "logins"
    }

    async createRecord(model: Model) {

        // console.log(model);
        // WITH login AS ( 
        //     INSERT INTO ${this.table}(email, password) VALUES($1, $2) 
        //     RETURNING id, email
        // ), 
        // result AS (
        //     INSERT INTO contacts(login, first_name, last_name, mobile) 
        //     VALUES((SELECT id FROM login), $3, $4, $5)
        //     RETURNING (SELECT id FROM login) AS id,(SELECT email FROM login) AS email, first_name, last_name, mobile
        // )
        // SELECT * FROM result;

        const result = await db.query(`
            WITH login AS(
                INSERT INTO ${this.table} (email, password, first_name, last_name, mobile)
                VALUES($1, $2, $3, $4, $5)
                RETURNING id, email
            ), result AS (
                INSERT INTO user_roles(login, role)
                VALUES((SELECT id FROM login), (SELECT id FROM roles WHERE name ='user'))
            )
            SELECT * FROM login
            `, [model.email, model.password, model.first_name, model.last_name, model.mobile]);

        return result.rows[0];

    }

    async findRecord(id: number) {

        const result = await db.query(`
            SELECT *
            FROM ${this.table}
            WHERE id = $1
            `, [id]);

        return result.rows[0];

    }

    async updateRecord(model: Model): Promise<Model> {

        const result = await db.query(`
            UPDATE ${this.table}
            SET password=$2
            WHERE email=$1
            RETURNING id, email
            `, [model.email, model.password]);

        console.log('rows', result.rows[0]);

        if (result.rowCount === 0)
            throw new BadRequestError("failed to update user");

        return result.rows[0];

    }

    async deleteRecord(id: number): Promise<Model> {

        const result = await db.query(`
                DELETE  FROM ${this.table}
                WHERE id =$1
                RETURNING *
            `, [id]);

        if (result.rowCount === 0)
            throw new BadRequestError();

        return result.rows[0];

    }

    async findRecordByEmail(email: string): Promise<Model> {

        const result = await db.query(`
                SELECT id, email, password
                FROM ${this.table}
                WHERE email=$1
            `, [email]);

        return result.rows[0];

    }

}

export default AuthRepository;