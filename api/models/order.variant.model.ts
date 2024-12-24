import IModel from "../interfaces/model.interface";

import OrderVariantOption from "./order.variant.option";

class Model implements IModel {

    id?: number | undefined;
    order?: number | undefined;
    product_variant: number | undefined;
    order_variant_options?: [] | undefined;

}

export default Model;