import IReposity from "../interfaces/repository.interface";
import Model from "../models/location.model";

import db from "../db";

class LocationRepository implements IReposity {

    table: string;

    constructor() {
        this.table = "locations";
    }

    async createRecord(model: Model) {

        const result = await db.query(`
            INSERT INTO ${this.table}(street_number, street_name, suburb, city, country, postal_code, store)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            `,
            [model.street_number, model.street_name, model.suburb, model.city, model.country, model.postal_code, model.store]);

        return result.rows[0];

    }

    async findRecord(id: number) {

        const result = await db.query(`
            SELECT * 
            FROM ${this.table}
            WHERE id=$1
            `,
            [id]);

        return result.rows[0];

    }

    async updateRecord(model: Model) {

        const result = await db.query(`
            UPDATE ${this.table}
            SET street_number=$1, street_name=$2, suburb=$3, city=$4, country=$5, postal_code=$6
            WHERE id=$7
            RETURNING *
            `,
            [model.street_number, model.street_name, model.suburb, model.city, model.country, model.postal_code, model.id]);

        return result.rows[0];

    }

    async deleteRecord(id: number) {

        const result = await db.query(`
            DELETE FROM ${this.table}
            WHERE id=$1
            RETURNING *
            `,
            [id]);

        return result.rows[0];

    }

    async findAllLocations(store: number) {

        const result = await db.query(`
            SELECT * 
            FROM ${this.table}
            WHERE store=$1
            `,
            [store]);

        return result.rows;

    }

}

export default LocationRepository;