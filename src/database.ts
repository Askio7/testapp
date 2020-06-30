import { Sequelize, Options, Model } from "sequelize";
import { User } from "./models/user";

export class Database {
    sequelize: Sequelize;

    constructor(options: Options) {
        this.sequelize = new Sequelize(options);
        this.initializeModels();
        this.sequelize.sync();
        console.log();
    }
    
    initializeModels() {
        User.initialize(this.sequelize);
    }
}