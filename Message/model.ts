import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import User from "../user/model";
import { sequelize } from "../database";

export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<String>;
  declare senderUserId: ForeignKey<User>;
  declare recieverUserId: ForeignKey<User>;
  declare message: CreationOptional<String>;
  declare imagesPath: CreationOptional<String>;
  declare roomId: CreationOptional<String>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
Message.init(
  {
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderUserId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
    recieverUserId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
    message: { type: DataTypes.TEXT },
    imagesPath: { type: DataTypes.TEXT },
    roomId: { type: DataTypes.TEXT },
  },
  {
    modelName: "message",
    tableName: "messages",
    sequelize: sequelize,
    timestamps: true,
  }
);
