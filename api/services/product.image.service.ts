import Repository from "../repositories/product.image.repository";
import Model from "../models/product.image.model";
import { NotFoundError, BadRequestError } from "../errors";

class Service {

    private repository = new Repository();

    async addProductImage(model:Model) {

        const result = await this.repository.createRecord(model);

        if(!result)
            throw new BadRequestError("failed to save product image");

        return result;

    }

    async getProductImage(id:number) {

        const result = await this.repository.findRecord(id);

        if(!result)
            throw new BadRequestError("image not found");

        return result;

    }
    
    async updateProductImage(model:Model) {

        const result = await this.repository.updateRecord(model);

        if(!result)
            throw new BadRequestError("failed update image");

        return result;

    }

    async deleteProductImage(id:number) {

        const result = await this.repository.deleteRecord(id);

        if(!result)
            throw new BadRequestError();

        return result;

    }

    async getAllProductImages(product:number) {

        const result = await this.repository.findAllRecords(product);

        if(!result)
            throw new BadRequestError();

        return result;

    }

}

export default Service;