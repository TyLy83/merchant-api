import IModel from "../interfaces/model.interface";

class Model implements IModel {
    id?: number | undefined;
    name?: string | undefined;
    login?: number | undefined;
}

export default Model;