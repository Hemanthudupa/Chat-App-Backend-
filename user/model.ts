import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  CreationOptional,
  UUID,
  UUIDV4,
  DataTypes,
} from "sequelize";
import { sequelize } from "../database";
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare userName: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare phoneNumber: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    password: {
      type: DataTypes.STRING,
    },
    userName: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "User",
    tableName: "user",
    sequelize,
    timestamps: true,
  }
);

export default User;
