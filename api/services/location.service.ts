import Repository from "../repositories/location.repository";
import Model from "../models/location.model";
import { BadRequestError, NotFoundError } from "../errors";

class LocationService {

    repository = new Repository();

    async getLocationByStore(store:number) {

        const result = await this.repository.findAllLocations(store);

        if(!result)
            throw new NotFoundError('locations not found');

        return result;

    }

    async getLocation(id:number) {

        const result = await this.repository.findRecord(id);

        if(!result)
            throw new NotFoundError('location not found');

        return result;

    }

    async addLocation(model: Model) {

        const result = await this.repository.createRecord(model);

        if(!result)
            throw new BadRequestError('failed to create location');

        return result;

    }

    async editLocation(model:Model) {

        const id:number = model.id as number;

        const location = await this.getLocation(id);

        if(!location)
            throw new BadRequestError('location does not exist');

        const result = await this.repository.updateRecord(model);

        if(!result)
            throw new BadRequestError('failed to update location');

        return result;

    }

    async deleteLocation(id:number) {

        const location = await this.getLocation(id);

        if(!location)
            throw new BadRequestError('location does not exist');
        
        const result = await this.repository.deleteRecord(id);

        if(!result)
            throw new BadRequestError('failed to delete location');

        return result;

    }

}

export default LocationService;