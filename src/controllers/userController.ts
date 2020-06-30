import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
// import * as jwt from "jsonwebtoken";
// import {  } from "jsonwebtoken";
import { User } from "../models/user";
import { JWT_SECRET } from "../util/secrets";
import { CustomRequest } from "../auth/customRequest";


export class UserController {

  public async registerUser(req: CustomRequest, res: Response): Promise<void> {
    res.json(req.decodedToken);
  }


  public async profiles(req: Request, res: Response, next: NextFunction) {
    const users = await User.findAll();
    res.send(users);
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    // fake user
    // const user = await User.findUserById(2).catch((err) => {
    //   console.log(err);
    //   res.sendStatus(404);
    // })
    const user = {
      username: req.body.username,
      password: req.body.password
    };
    await User.create(user);
    res.send("erfolg");
    // if (user) {
    //   const token = jwt.sign(user.toJSON(), "secret", {expiresIn: 20});
    //   res.send(token);
    // }  
  }
}