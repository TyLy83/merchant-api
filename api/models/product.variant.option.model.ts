import IModel from "../interfaces/model.interface";

class Model implements IModel {

    name?: string;
    price?: number;
    product_variant?: number;
    id?: number;

}

export default Model;