import IModel from "../interfaces/model.interface";

class Model implements IModel {

    name?: string | undefined;
    price?: number | undefined;
    product_variant?: number | undefined;
    id?: number | undefined;

}

export default Model;