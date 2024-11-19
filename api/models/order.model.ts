import IModel from "../interfaces/model.interface";

class Model implements IModel {

    id?: number | undefined;
    customer?: number | undefined;
    quantity: number | undefined;

}

export default Model;