import IModel from "../interfaces/model.interface";

class Model implements IModel {

    id?: number | undefined;
    name: string | undefined;
    store?:number | undefined;

}

export default Model;