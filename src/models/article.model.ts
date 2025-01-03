import * as Sequelize from 'sequelize';

import { ArticleModelInterface } from '../interfaces';
import { Database } from '../config';
import userModel from './user.model';

const sequelize = Database.sequelize;

const articleModel = sequelize.define<ArticleModelInterface>(
  'articles',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id',
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
    },
    fileMeta: {
      type: Sequelize.JSONB,
      field: 'file_meta',
    },
    fileData: {
      type: Sequelize.BLOB('medium'),
      field: 'file_data',
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        concurrently: true,
        fields: ['userId'],
        where: {
          deleted_at: null,
        },
      },
    ],
  },
);

export default articleModel;

articleModel.belongsTo(userModel, {
  foreignKey: 'userId',
  as: 'user',
});

userModel.hasMany(articleModel, {
  foreignKey: 'userId',
  as: 'articles',
});
