import ProductVariantRepository from "../repositories/product.variant.repository";
import ProductVariantOptionRepository from "../repositories/product.variant.option.repository";
import ProductVariantModel from "../models/product.variant.model";

import { NotFoundError, BadRequestError } from "../errors";


class ProductVariantService {

    private repository = new ProductVariantRepository();
    private productVariantOptions = new ProductVariantOptionRepository();

    async getProductVariants(product: number) {

        const result = await this.repository.findAllRecords(product);

        if (!result)
            throw new NotFoundError();

        return result;

    }

    async addProductVariant(product_variant: ProductVariantModel) {

        const result = await this.repository.createRecord(product_variant);

        if (!result)
            throw new BadRequestError();

        return result;

    }

    async getProductVariant(id: number) {

        const result = await this.repository.findRecord(id);

        if (!result)
            throw new BadRequestError();

        const product_variant_options = await this.productVariantOptions.findAllRecords(id);

        return { ...result, product_variant_options }

    }

    async editProductVariant(product_variant: ProductVariantModel) {

        const result = await this.repository.updateRecord(product_variant);

        if (!result)
            throw new BadRequestError();

        return result;

    }

    async deleteProductVariant(id: number) {

        const result = await this.repository.deleteRecord(id);

        if (!result)
            throw new BadRequestError();

        return result;

    }

}

export default ProductVariantService;