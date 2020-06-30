import {
  Sequelize,
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
  FindAttributeOptions,
  where,
} from "sequelize";



// These are all the attributes in the User model
interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public username!: string;
  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        password: {
          type: new DataTypes.STRING(128),
          allowNull: true,
        },
      },
      {
        tableName: "users",
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }


  // Helper Functions
  static async findUserById(userId: number): Promise<User> {
    if (userId <= 0) {
      throw "UserId must be > 0";
    }
    const user = await this.findOne({
      where: {
        id: userId
      }
    });

    if (user == undefined) {
      throw "User with id " + userId + "does not exist.";
    }
    return user;
  }

  static async findUserByName(userName: string): Promise<User> {
    return await this.findOne({
      where: {
        username: userName
      }
    }).catch((err) => {return err});
  }
  
}