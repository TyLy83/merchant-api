import IModel from "../interfaces/model.interface";

class Model implements IModel {

    id?: number | undefined;
    order_variant?: number | undefined;
    product_variant_option: number | undefined;

}

export default Model;