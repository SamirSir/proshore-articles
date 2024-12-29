import * as Sequelize from 'sequelize';
import { UserModelInterface } from '../interfaces';

export default (sequelize: Sequelize.Sequelize) => {
  const User = sequelize.define<UserModelInterface>(
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
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );
  return User;
};
