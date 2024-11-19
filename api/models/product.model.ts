import IModel from "../interfaces/model.interface";

class Model implements IModel {

    public id?: number | undefined;
    public name?: string | undefined;
    public price?: number | undefined;
    public store?: number | undefined;
    public category?: number | undefined;

}

export default Model;