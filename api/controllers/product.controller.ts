import { NextFunction, Request, Response } from "express";
import { param, query, body, validationResult, FieldValidationError } from "express-validator";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

import IController from "../interfaces/controller.interface";
import Service from "../services/product.service";
import Model from "../models/product.model";
import { BadRequestError, NotFoundError } from "../errors";

import db from "../db";

class Product extends IController {

    private service;

    private addValidator = [
        body('name').notEmpty().withMessage('name must not be empty'),
        body('price').notEmpty().withMessage('price must not be empty'),
        body('store').notEmpty().withMessage('store must not be empty'),
        body('category').notEmpty().withMessage('category must not be empty')
    ];

    private editValidator = [
        param('id').notEmpty().withMessage('id must not be empty'),
        body('price').notEmpty().withMessage('price must not be empty'),
        body('category').notEmpty().withMessage('category must not be empty')
    ];

    private getValidator = [
        param('id').notEmpty().withMessage('id must not be empty')
    ];

    private getAllValidator = [
        query('store').notEmpty().withMessage('store must not empty')
    ];

    private deleteValidator = [
        param('id', 'Product id must not be empty').notEmpty().escape()
    ];

    private upload = multer({
        storage: multer.diskStorage({
            destination: function (req:Request, file, callback) {

                const id = req.params.id;

                const dir = path.join("./public/uploads/", `${id}`);

                if(!fs.existsSync(dir))
                    fs.mkdirSync(dir)

                callback(null, dir);

                // cb(null, "./public/uploads/")
            },
            filename: function (req: any, file: any, callback: any) {

                // const id = req.params.id
                callback(null, file.originalname)
                // cb(null, `${id}.png`)
            }
        }),
        fileFilter: (req: any, file: any, cb: any) => {
            if (file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/png") {

                cb(null, true);

            } else {
                cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
            }
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        }
    });

    constructor() {
        super("/products");
        this.initializeRoutes();
        this.service = new Service();
    }

    protected initializeRoutes() {
        this.router.get(this.path, this.getAllValidator, this.getProducts);
        this.router.post(`${this.path}/add`, this.addValidator, this.addProduct);
        this.router.put(`${this.path}/edit/:id`, this.editValidator, this.editProduct);
        this.router.get(`${this.path}/details/:id`, this.getValidator, this.getProduct);
        this.router.delete(`${this.path}/delete/:id`, this.deleteValidator, this.deleteProduct);
        this.router.put(`${this.path}/images/:id`, this.upload.single("image"), this.uploadImage);
    }

    private getProducts = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const store: number = parseInt(request.query.store as string);

                const result = await this.service.getProducts(store);

                response.status(200).json([...result]);

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (err) {

            next(err);

        }

    };

    private addProduct = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.name = request.body.name as string;
                model.price = parseFloat(request.body.price as string);
                model.store = parseInt(request.body.store as string);
                model.category = parseInt(request.body.category as string)

                const result = await this.service.addProduct(model);

                response.status(201).json({ ...result });

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private editProduct = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const model = new Model();

                model.id = parseInt(request.params.id as string);
                model.name = request.body.name as string;
                model.price = parseFloat(request.body.price as string);
                model.category = parseInt(request.body.category as string);

                const result = await this.service.updateProduct(model);

                response.status(200).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }
    }

    private getProduct = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const id: number = parseInt(request.params.id as string);

                const result = await this.service.getProduct(id);

                response.status(200).json(result);

            } else {

                response.status(500).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private deleteProduct = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const errors = validationResult(request);

            if (errors.isEmpty()) {

                const id: number = parseInt(request.params.id as string)

                const result = await this.service.deleteProduct(id);

                response.status(200).json({ ...result })

            } else {

                response.status(200).json({ errors: errors.array() });

            }

        } catch (error) {

            next(error);

        }

    }

    private uploadImage = async (request: Request, response: Response, next: NextFunction) => {

        try {

            const file = request.file;
            const id: number = parseInt(request.params.id as string);
            const protocol = request.protocol;
            const host = request.get('host');

            if (file) {

                const newFilePath = path.resolve(file.destination, `${id}__.png`);

                console.log(newFilePath);

                const __file =  await sharp(file.path)
                    .resize()
                    .toFile(newFilePath);

                fs.unlinkSync(file.path);


                response.json(__file);

            } else {
                throw new NotFoundError("file not found");
            }


        } catch (error) {

            next(error);

        }
        // console.log('file', file);

        // response.json({});
    }
}

export default Product;