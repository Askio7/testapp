import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../auth/customRequest";
import * as jwt from "jsonwebtoken";

export class AuthController {

  public checkToken(req: CustomRequest, res: Response, next: NextFunction) {
    const header: string = req.headers["authorization"];
    console.log(header);
    if (header !== undefined) {
      const bearer = header.split(" ");
      const bearerToken = bearer[1];

      try {
        const decoded = jwt.verify(bearerToken, "secret");
        req.decodedToken = decoded;
      } catch(err) {
        res.sendStatus(403);
      }
      next();
    } else {
      res.sendStatus(403);
    }
  }
}
