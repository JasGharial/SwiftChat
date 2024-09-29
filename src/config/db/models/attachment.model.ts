import { Model, DataTypes } from "sequelize";
import sequelize from "../connection";

export class Attachment extends Model {
  public id!:string;
  public file_name!: string;
  public file_path!: string;
  public file_type!: string;
  public file_size!: string;
  public uploadable_type!: string;
  public uploadable_id!: string;
  public created_at!: string;
}

Attachment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_size: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  uploadable_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploadable_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'Attachment',
  tableName: 'attahments'
})
