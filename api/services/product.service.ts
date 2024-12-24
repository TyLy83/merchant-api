import Repository from "../repositories/product.repository";
import ProductVariantRepository from "../services/product.variant.service";
import StoreRepository from "../repositories/store.repository";
import CategoryRepository from "../repositories/category.repository";
import ProductImageRepository from "../repositories/product.image.repository";

import Model from "../models/product.model";

import { NotFoundError, BadRequestError } from "../errors";


class ProductVariantService {

    private repository = new Repository();
    private productVariants = new ProductVariantRepository();
    private stores = new StoreRepository();
    private categories = new CategoryRepository();
    private images = new ProductImageRepository();

    async addProduct(product: Model) {

        const result = await this.repository.createRecord(product);

        if (!result)
            throw new BadRequestError();

        return result;

    }

    async getProductVariants(product: number) {

        const product_variants = await this.productVariants.getProductVariants(product);

        if (!product_variants)
            return [];

        const promises = product_variants.map(async ({ id }) => {


            const product_variant = await this.productVariants.getProductVariant(parseInt(`${id}`));

            return product_variant;

        });

        return await Promise.all(promises);

    }

    async getCategory(category:number) {

        const result = await this.categories.findRecord(category);

        return result;

    }

    async getStore(store: number) {

        const result = await this.stores.findRecord(store);
        return result;

    }

    async getProductImage(product:number) {

        const result = await this.images.findAllRecords(product);
        return result;

    }

    async getProduct(id: number) {

        const result = await this.repository.findRecord(id);

        if (!result)
            throw new BadRequestError('product not found');

        const product_variants = await this.getProductVariants(id);

        const store = await this.getStore(result.store as number);
        const category = await this.getCategory(result.category as number);
        const images = await this.getProductImage(id);

        return { ...result, store, category, product_variants:[...product_variants], images:[...images] }

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