import { NextFunction, Request, Response } from "express";
import IModel from "../interfaces/model.interface";

class Model implements IModel {
    public id?: number | undefined;
    public path?: string | undefined;
    public product?: number | undefined;
    public name?: string | undefined;
    public file?:  any;
}

export default Model;