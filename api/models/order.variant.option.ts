import IModel from "../interfaces/model.interface";

class Model implements IModel {

    id?: number | undefined;
    order_variant?: number | undefined;
    price: number | undefined;
    name?: string | undefined;

}

export default Model;