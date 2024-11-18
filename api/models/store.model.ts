import IModel from "../interfaces/model.interface";

class Model implements IModel {
    id?: number;
    name?: string;
    login?: number;
}

export default Model;