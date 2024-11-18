import IModel from "../interfaces/model.interface";

class Model implements IModel {

    id?: number;
    name?: string;
    max_number?: number;
    min_number?: number;
    product?: number;

}

export default Model;