import IReposity from "../interfaces/repository.interface";
import Model from "../models/contact.model";
import db from "../db";
import { BadRequestError, NotFoundError } from "../errors";

class ContactRepository implements IReposity {
    table: string;

    constructor() {
        this.table = "logins";
    }

    // async createRecord(model: Model): Promise<Model> {

    //     const result = await db.query(`
    //         INSERT INTO ${this.table}(first_name, last_name, mobile, login) 
    //         VALUES ($1, $2, $3, $4) 
    //         RETURNING *
    //         `, [model.first_name, model.last_name, model.mobile, model.login]);

    //     return result.rows[0];

    // }

    async findRecord(id: number): Promise<Model> {

        const result = await db.query(`
            SELECT first_name, last_name, email, mobile
            FROM ${this.table}
            WHERE id = $1
            `, [id]);

        if (result.rowCount === 0)
            throw new NotFoundError('contact not found');

        return result.rows[0];

    }

    async updateRecord(model: Model): Promise<Model> {

        const result = await db.query(`
            UPDATE ${this.table} 
            SET first_name = $2, last_name = $3, mobile= $4  
            WHERE id = $1 
            RETURNING id, first_name, last_name, email, mobile
            `, [model.id, model.first_name, model.last_name, model.mobile]);

        // if (result.rowCount === 0)
        //     throw new NotFoundError('failed to update contact');

        return result.rows[0];

    }

    async deleteRecord(id: number): Promise<Model> {

        const result = await db.query(`
            DELETE FROM ${this.table} 
            WHERE id = $1 
            RETURNING id, first_name, last_name, email, mobile
            `, [id]);

        // if (result.rowCount === 0)
        //     throw new NotFoundError('failed to delete contact');

        return result.rows[0];
    }

    async getContacts(login: number): Promise<Model[]> {

        const result = await db.query("SELECT * FROM contacts WHERE id=$1", [login]);

        // if (result.rowCount === 0)
        //     throw new BadRequestError("contact not found");

        return result.rows;

    }

}

export default ContactRepository;