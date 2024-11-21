import IReposity from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/auth.model";

class Repository implements IReposity {

    table: string;

    constructor() {
        this.table = "logins";
    }

    async getUserByEmail(email: string) {

        const result = await db.query(`
            SELECT id, email
            FROM ${this.table}
            WHERE email=$1
            `, [email]);

        return result.rows[0];

    }

    async getUserById(id: string) {

        const result = await db.query(`
            SELECT id, email
            FROM ${this.table}
            WHERE id=$1
            `, [id])

    }

    async getUserRoleByEmail(email: string) {

        const result = await db.query(`
                WITH login AS(
                    SELECT id FROM logins WHERE email=$1
                ), result AS(
                    SELECT roles.name 
                    FROM user_roles
                    JOIN roles  ON roles.id = user_roles.role
                    WHERE user_roles.login = (SELECT id FROM login)
                )
                SELECT * FROM result;
            `, [email]);

        return result.rows;

    }

    async getUserRoleByUserId(id:number) {
        
        const result = await db.query(`
            SELECT roles.name 
            FROM user_roles
            JOIN roles  ON roles.id = user_roles.role
            WHERE user_roles.login = $1
            `, [id]);

        return result.rows;
        
    }

}

export default Repository;

