import IModel from "../interfaces/model.interface";

class Model implements IModel {
    id?:number;
    first_name?:string;
    last_name?:string;
    mobile?:string;
    email?:string;
    login?:number;
}

export default Model;