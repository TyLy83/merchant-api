import IModel from "../interfaces/model.interface";

class Model implements IModel {

    id?: number | undefined;
    name?: string | undefined;
    max_number?: number | undefined;
    min_number?: number | undefined;
    product?: number | undefined;

}

export default Model;