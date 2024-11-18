import ProductRepository from "../repositories/product.repository";
import Model from "../models/product.model";

import { NotFoundError, BadRequestError } from "../errors";


class ProductVariantService {

    private repository;

    constructor() {
        this.repository = new ProductRepository();
    }

    async addProduct(product: Model) {

        const result = await this.repository.createRecord(product);

        if (!result)
            throw new BadRequestError();

        return result;

    }

    async getProduct(id: number) {

        const result = await this.repository.findRecord(id);

        if (!result)
            throw new BadRequestError('product not found');

        return result;

    }

    async updateProduct(product: Model) {

        const result = await this.repository.updateRecord(product);

        if (!result)
            throw new BadRequestError('failed to update product');

        return result;

    }

    async deleteProduct(id: number) {

        const result = await this.repository.deleteRecord(id)

        if (!result)
            throw new BadRequestError('failed to delete');

        return result;

    }

    async getProducts(store: number) {

        const result = await this.repository.findAllProducts(store);

        if (!result)
            throw new BadRequestError('failed to find products');

        return result;

    }

}

export default ProductVariantService;