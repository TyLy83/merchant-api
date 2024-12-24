import IModel from "../interfaces/model.interface";

import OrderVariant from "./order.variant.model";

class Model implements IModel {

    id?: number | undefined;
    customer?: number | undefined;
    quantity: number | undefined;
    product: number | undefined;
    order_variants?: [] | undefined;

}

export default Model;