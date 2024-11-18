import IModel from "../interfaces/model.interface";

class Model implements IModel {

    public name?: string;
    public store?:number;
    public id?:number;

}

export default Model;