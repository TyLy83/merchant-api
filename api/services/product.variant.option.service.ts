import Repository from "../repositories/product.variant.option.repository";
import Model from "../models/product.variant.option.model";

import { NotFoundError, BadRequestError } from "../errors";


class ProductVariantService {

    private repository;

    constructor() {
        this.repository = new Repository();
    }

    async getProductVariantOptions (product_variant: number) {

        const result = await this.repository.findAllRecords(product_variant);

        if (!result)
            throw new NotFoundError('product variant option not found');

        return result;

    }

    async addProductVariantOption(product_variant_option: Model) {

        const result = await this.repository.createRecord(product_variant_option);

        if (!result)
            throw new BadRequestError('failed to create product variant option');

        return result;

    }

    async getProductVariantOption(id: number) {

        const result = await this.repository.findRecord(id);

        if(!result)
            throw new BadRequestError('product variant option not found');

        return result;

    }

    async editProductVariantOption(product_variant_option: Model) {

        const result = await this.repository.updateRecord(product_variant_option);

        if(!result)
            throw new BadRequestError('failed to update product variant option');

        return result;

    }

    async deleteProductVariantOption(id: number) {

        const result = await this.repository.deleteRecord(id);

        if(!result)
            throw new BadRequestError('failed to delete product variant option');

        return result;

    }

}

export default ProductVariantService;