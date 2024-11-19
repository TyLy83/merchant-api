import IModel from "../interfaces/model.interface";

class Model implements IModel {

    public name?: string | undefined;
    public store?:number | undefined;
    public id?:number | undefined;

}

export default Model;