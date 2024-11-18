import IModel from "../interfaces/model.interface";

class Model implements IModel {

    public id?: number;
    public name?: string;
    public price?: number;
    public store?: number;
    public category?: number;

}

export default Model;