import express from "express";

import compression from "compression";
import cors from "cors";
import * as path from "path";

import { MONGODB_URI } from "./util/secrets";
import { UserRoutes } from "./routes/userRoutes";
import { Database } from "./database";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public routes(): void {
    this.app.use("/api/user", new UserRoutes().router);
  }

  public config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(cors());
    // this.app.get('/', (req,res) => {
    //   res.send("asdf")
    // });
    this.app.use(express.static(path.join(__dirname, "/public")));
   
  }

 

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(
        "  API is running at http://localhost:%d",
        this.app.get("port")
      );
    });
  }

}

const server = new Server();
const database = new Database({dialect: "sqlite", storage:"./test.sqlite3"})
server.start();

try {
  database.sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}