import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  STRING,
  UUID,
  UUIDV4,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../database";

export class Music extends Model<
  InferAttributes<Music>,
  InferCreationAttributes<Music>
> {
  declare id: CreationOptional<string>;
  declare songName: CreationOptional<string>;
  declare songUrl: CreationOptional<string>;
  declare songImage: CreationOptional<string>;
  declare songDuration: CreationOptional<string>;
  declare songArtist: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Music.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    songName: {
      type: STRING,
      allowNull: false,
    },
    songUrl: {
      type: STRING,
      allowNull: false,
    },
    songArtist: {
      type: STRING,
      allowNull: false,
    },
    songDuration: {
      type: STRING,
      allowNull: false,
    },
    songImage: {
      type: STRING,
      allowNull: false,
    },
    updatedAt: {
      type: STRING,
      allowNull: false,
    },
    createdAt: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    modelName: "music",
    tableName: "music",
    sequelize: sequelize,
    timestamps: true,
  }
);
