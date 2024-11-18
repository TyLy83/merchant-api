import IModel from "../interfaces/model.interface";

class Model implements IModel {
    id?: number;
    street_number?: number
    street_name?: string;
    suburb?: string;
    city?: string;
    postal_code?: number;
    country?: string;
    store?:number;
}

export default Model;