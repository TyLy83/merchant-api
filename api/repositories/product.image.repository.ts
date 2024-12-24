import sharp from "sharp";
import path from "path";
import fs from "fs";

import IRepository from "../interfaces/repository.interface";
import db from "../db";
import Model from "../models/product.image.model";


class Repository implements IRepository {

    table: string;

    constructor() {
        this.table = "product_images";
    }

    async createRecord(model: Model): Promise<Model> {

        const file = model.file;
        const newFileName = "__" + model.name;
        const newFilePath = path.resolve(file.destination, newFileName);

        await sharp(file.path)
            .resize()
            .toFile(newFilePath);

        fs.unlinkSync(file.path); // delete original file

        const result = await db.query(`
            INSERT INTO ${this.table}(path, product, name)
            VALUES($1, $2, $3)
            RETURNING *
        `, [`${model.path}/${newFileName}`, model.product, newFileName]);

        return result.rows[0];

    }

    async findRecord(id: number): Promise<Model> {

        const result = await db.query(`
            SELECT * 
            FROM ${this.table} 
            WHERE id=$1            
        `, [id]);

        return result.rows[0];

    }

    async updateRecord(model: Model): Promise<Model> {

        const file = model.file;
        const newFileName = "__" + file.filename;
        const newFilePath = path.resolve(file.destination, `${newFileName}`);
        const oldFilePath = path.resolve(file.destination, `${model.name}`);

        console.log("new file path", newFilePath);
        console.log("old file path", oldFilePath);
        // console.log("file path[original]", file.path);

        await sharp(file.path)
            .resize()
            .toFile(newFilePath);

        fs.unlinkSync(file.path);

        if (fs.existsSync(oldFilePath))
            fs.unlinkSync(oldFilePath); // delete old file;

        const result = await db.query(`
            UPDATE ${this.table}
            SET name=$1, path=$2
            WHERE id=$3
            RETURNING *
        `, [newFileName, `${model.path}/${newFileName}`, model.id]);

        return result.rows[0];

    }

    async deleteRecord(id: number): Promise<Model> {

        const image: Model = await this.findRecord(id);

        const filePath = path.resolve("./public/uploads", `${image.product}/${image.name}`)

        const result = await db.query(`
            DELETE FROM ${this.table}
            WHERE id=$1
            RETURNING *
        `, [id]);

        if (fs.existsSync(filePath))
            fs.unlinkSync(filePath); // delete image file

        return result.rows[0];

    }

    async findAllRecords(product: number): Promise<Model[]> {

        const result = await db.query(`
            SELECT * 
            FROM ${this.table}
            WHERE product=$1
        `, [product]);

        return result.rows;
    }

}

export default Repository;