import IModel from "../interfaces/model.interface";

class Model implements IModel {
    id?: number | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    mobile?: string | undefined;
    email?: string | undefined;
    login?: number | undefined;
}

export default Model;