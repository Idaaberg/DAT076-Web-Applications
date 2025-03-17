import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { Association } from "sequelize";
import { conn } from "./conn";
import { BookModel } from "./book.db";


/**
 * UserModel represents a user in the database
 */
export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare static associations: {
    books: Association<UserModel, BookModel>;
  };
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    sequelize: conn,
    tableName: "users",
    timestamps: false,
  }
);

UserModel.hasMany(BookModel, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'books'
});
