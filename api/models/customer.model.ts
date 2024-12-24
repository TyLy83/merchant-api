import IModel from "../interfaces/model.interface";

import Order from "./order.model";

class Model implements IModel {

    id?: number | undefined;
    name: string | undefined;
    store?: number | undefined;
    orders?: [] | undefined;

}

export default Model;