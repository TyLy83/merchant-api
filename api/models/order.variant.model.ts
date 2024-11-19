import IModel from "../interfaces/model.interface";

class Model implements IModel {

    id?: number | undefined;
    order?: number | undefined;
    quantity: number | undefined;
    name?: string | undefined;

}

export default Model;