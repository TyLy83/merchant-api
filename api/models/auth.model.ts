import IModel from "../interfaces/model.interface";

class Model implements IModel {

    public id?: number | undefined;
    public email?: string | undefined;
    public password?: string | undefined;
    public first_name?: string | undefined;
    public last_name?: string | undefined;
    public mobile?: string | undefined;
    public user_roles?: string[] | undefined;

}

export default Model;