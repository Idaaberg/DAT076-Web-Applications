import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import { conn } from './conn';
import { UserModel } from './user.db';
import { BookState } from '../model/book.interface';

export class BookModel extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare author: string;
  declare state: BookState
  declare rating: number;
  declare comment: string;
  declare userId: ForeignKey<UserModel['id']>
}

BookModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM,
        values: ['Have Read', 'Want to Read', 'Reading'],
        allowNull: false
      },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5
        }
  },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
  {
    sequelize: conn,
    tableName: 'books',
    timestamps: false,
  }
);