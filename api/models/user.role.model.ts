import IModel from "../interfaces/model.interface";

class Model implements IModel {
    id?: number | undefined;
    role?: number | undefined;
    login?: number | undefined;
}

export default Model;