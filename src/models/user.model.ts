import * as Sequelize from 'sequelize';

import { UserModelInterface } from '../interfaces';
import { Database } from '../config';

const sequelize = Database.sequelize;

const userModel = sequelize.define<UserModelInterface>(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        concurrently: true,
        unique: true,
        type: 'UNIQUE',
        fields: ['email'],
        where: {
          deleted_at: null,
        },
      },
    ],
  },
);

export default userModel;
