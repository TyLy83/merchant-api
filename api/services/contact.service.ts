import Repository from "../repositories/contact.repository";
import Model from "../models/contact.model";
import { BadRequestError } from "../errors";

class ContactService  {

    repository = new Repository();

    // async addContact (model:Model) {

    //     // const result = await this.repository.createRecord(model);

    //     // if(!result)
    //     //     throw new BadRequestError('failed to create contact');

    //     // return result;
        
    //     return model;

    // }

    async getContact (id:number) {

        const result = await this.repository.findRecord(id);

        if(!result)
            throw new BadRequestError('contact not found');

        return result;
    }

    async editContact(model:Model) {

        const result = await this.repository.updateRecord(model);

        if(!result)
            throw new BadRequestError('failed to update contact');

        return result;

    }

    async deleteContact(id:number) {

        const result = await this.repository.deleteRecord(id);

        if(!result)
            throw new BadRequestError('failed to delete contact');

        return result;

    }

    // async getContacts(login:number) {

    //     const result = await this.repository.getContacts(login);

    //     if(!result)
    //         throw new BadRequestError('contacts not found');

    //     return result;

    // }

}

export default ContactService;