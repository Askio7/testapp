import { Request } from "express";

export interface CustomRequest extends Request {
    decodedToken: string | object;
}