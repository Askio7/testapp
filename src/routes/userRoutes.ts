import { Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";

export class UserRoutes {

    router: Router;
    public userController: UserController = new UserController();
    private authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        // For TEST only ! In production, you should use an Identity Provider !!
        this.router.post("/register", this.userController.register);
        // this.router.post("/authenticate", this.userController.login);
        this.router.get("/profile", this.userController.profiles);
    }
}