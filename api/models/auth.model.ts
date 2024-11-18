import IModel from "../interfaces/model.interface";

class Model implements IModel {

    public id?: number;
    public email?: string;
    public password?: string;
    public first_name?: string;
    public last_name?: string;
    public mobile?:string;

}

export default Model;