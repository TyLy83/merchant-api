import IModel from "../interfaces/model.interface";

class Model implements IModel {

    id?: number | undefined;
    street_number?: number | undefined;
    street_name?: string | undefined;
    suburb?: string | undefined;
    city?: string | undefined;
    postal_code?: number | undefined;
    country?: string | undefined;
    store?: number | undefined;
    
}

export default Model;