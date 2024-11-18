import Repository from "../repositories/category.repository";
import Model from "../models/category.model";

import { NotFoundError, BadRequestError } from "../errors";


class CategoryService {

    private repository;

    constructor() {
        this.repository = new Repository();
    }

    public async addCategory(category: Model) {

        const result = await this.repository.createRecord(category);

        if(!result)
            throw new BadRequestError('failed to create category');

        return result;

    }

    public async getCategory(id: number) {

        const result = await this.repository.findRecord(id);

        if(!result)
            throw new BadRequestError('category not found');

        return result;

    }

    public async updateCategory(category: Model) {

        const result = await this.repository.updateRecord(category);

        if(!result)
            throw new BadRequestError('failed to update category');

        return result;

    }

    public async deleteCategory(id: number) {


        const category = await this.repository.findRecord(id);

        if(!category)
            throw new BadRequestError('category not found');

        const result = await this.repository.deleteRecord(id);

        if (!result)
            throw new BadRequestError('failed to delete category');

        return result;

    }

    async getCategories(store:number) {

        const result = await this.repository.findAllCategories(store);

        if(!result)
            throw new BadRequestError('failed to retrieve categories');

        return result;

    }

}

export default CategoryService;