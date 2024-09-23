import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../connection";
import bcrypt from "bcrypt";

export interface UserAttributes {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  color: string;
  profile_setup: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'first_name' | 'last_name' | 'profile_setup' | 'color' | 'password'> {
    password: string
  }

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
  UserAttributes {
    created_at?: Date;
    updated_at?: Date;
  }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public color!: string;
  public profile_setup!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profile_setup: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'users',
  modelName: 'User',
  hooks: {
    beforeCreate: async (user: UserInstance & { password?: string }, options) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  },
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] },
    }
  }
})
