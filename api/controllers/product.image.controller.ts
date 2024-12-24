import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult, FieldValidationError } from "express-validator";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

import { v4 as uuid } from "uuid";

import IController from "../interfaces/controller.interface";
import Service from "../services/product.image.service";
import Model from "../models/product.image.model";
import { BadRequestError, NotFoundError } from "../errors";
import env from "../env";

import db from "../db";

class Product extends IController {

    private service = new Service();
    private model = new Model();
    private storage = multer.diskStorage({
        destination: function (req: Request, file, callback) {

            try {

                const id = req.body.product;
                const dir = path.join(env.UPLOAD_PATH, id);

                if (!fs.existsSync(dir))
                    fs.mkdirSync(dir);

                callback(null, dir);

            } catch (error) {

                callback(new BadRequestError("failed to create upload destination"), '');

            }
            // const id = req.body.product;
            // const dir = path.join(env.UPLOAD_PATH, id);

            // callback(null, dir);

        },
        filename: function (req: any, file: any, callback: any) {

            const ext = file.originalname.split('.')[1];
            const name = uuid();

            callback(null, `${name}.${ext}`)

        }
    });
    private fileFilter = (req: any, file: any, callback: any) => {

        if (file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png") {

            callback(null, true);

        } else {

            callback(new Error("Image uploaded is not of type jpg/jpeg or png"), false);

        }
    }
    private limits = {
        fileSize: 5 * 1024 * 1024,
    }
    private upload;

    constructor() {
        super("/product_images");
        this.initializeRoutes();
        this.upload = multer({ storage: this.storage, fileFilter: this.fileFilter, limits: this.limits }).single("image");

        if (!fs.existsSync(path.resolve(env.UPLOAD_PATH)))
            fs.mkdirSync(path.resolve(env.UPLOAD_PATH));
    }

    protected initializeRoutes() {
        this.router.post(`${this.path}/add`, this.handleUpload, this.add);
        this.router.put(`${this.path}/edit/:id`, this.handleUpload, this.edit);
        this.router.get(`${this.path}/details/:id`, this.get);
        this.router.delete(`${this.path}/delete/:id`, this.delete);
        this.router.get(`${this.path}`, this.getAll);
    }

    private add = async (request: Request, response: Response, next: NextFunction) => {

        const file = request.file;
        const product: number = parseInt(request.body.product as string);
        const protocol = request.protocol;
        const host = request.get('host');
        const name = file ? file.filename : "";

        try {

            if (file) {

                this.model.file = file;
                this.model.name = name;
                this.model.path = `${protocol}://${host}/uploads/${product}`;
                this.model.product = product;

                const result = await this.service.addProductImage(this.model);

                response.status(201).json(result);

            } else {

                throw new NotFoundError("file not found");
            }


        } catch (error) {

            if (file) {

                fs.unlinkSync(path.resolve("./public/uploads", `${product}/${name}`));

            }

            next(error);

        }
    }

    private get= async (request: Request, response: Response, next: NextFunction) => {


        const strId = request.params.id;

        try {

            const id = parseInt(strId);

            const result = await this.service.getProductImage(id);

            response.status(200).json(result);
            
        } catch (error) {
            
            next(error);

        }

    }

    private edit = async (request: Request, response: Response, next: NextFunction) => {

        const id = parseInt(request.params.id as string);
        const file = request.file;
        const protocol = request.protocol;
        const host = request.get('host');

        try {

            const image: Model = await this.service.getProductImage(id);

            if (!image)
                throw new NotFoundError("image not found");

            this.model.id = id;
            this.model.file = file;
            this.model.name = image.name;
            this.model.product = image.product;
            this.model.path =  this.model.path = `${protocol}://${host}/uploads/${image.product}`;

            const result = await this.service.updateProductImage(this.model);

            response.status(200).json(result);

        } catch (error) {

            next(error);

        }

    }

    private delete = async (request: Request, response: Response, next: NextFunction) => {


        const strId = request.params.id;

        try {

            const id = parseInt(strId) 

            const image= await this.service.getProductImage(id);

            if(!image)
                throw new NotFoundError("image not found");

            const result = await this.service.deleteProductImage(id);

            response.status(200).json(result);
            
        } catch (error) {
            
            next(error);

        }

    }

    private getAll = async (request: Request, response: Response, next: NextFunction) => {

        const prdStr = request.query.product as string;

        try {

            const product = parseInt(prdStr);

            const result = await this.service.getAllProductImages(product);

            if(!result)
                throw new BadRequestError("image not found");

            response.status(200).json(result);
            
        } catch (error) {

            next(error);
            
        }
    }

    private handleUpload = (request: Request, response: Response, next: NextFunction) => {

        try {

            this.upload(request, response, (error) => {

                // console.log("error", error);
                if (error instanceof multer.MulterError) {

                    response.status(404).send(error);
                    // throw new BadRequestError(error.message);

                } else if (error) {

                    response.status(404).send(error);
                    // throw new BadRequestError(error.message);

                }

                // everything went fine.
                next();

            });

        } catch (error) {

            next(error);

        }

    }

}

export default Product;