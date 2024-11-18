import StoreRepository from "../repositories/store.repository";
import LocationRepository from "../repositories/location.repository";

import Model from "../models/store.model";
import { BadRequestError, NotFoundError } from "../errors";

class StoreService {

    private reposity = new StoreRepository();
    private location = new LocationRepository();

    async addStore(model: Model) {

        const result = await this.reposity.createRecord(model);

        if (!result)
            throw new BadRequestError('failed to create store');

        return result;

    }

    async getStore(id: number) {

        const result = await this.reposity.findRecord(id);

        if (!result)
            throw new NotFoundError('store not found');

        const locations = await this.location.findAllLocations(id);

        return {
            ...result,
            locations
        }

    }

    async editStore(model: Model) {

        const result = await this.reposity.updateRecord(model);

        if (!result)
            throw new BadRequestError('failed to update store');

        return result;

    }

    async deleteStore(id: number) {

        const result = await this.reposity.deleteRecord(id)

        if (!result)
            throw new BadRequestError('failed to delete store');

        return result;

    }

    async getStores(login: number) {

        const result = await this.reposity.getStoreByLogin(login);

        if(!result)
            throw new NotFoundError('stores not found');

        return result;

    }

}

export default StoreService;