import * as Sequelize from 'sequelize';

import { ArticleMediaModelInterface } from '../interfaces';
import { Database } from '../config';
import articleModel from './article.model';

const sequelize = Database.sequelize;

const articleMediaModel = sequelize.define<ArticleMediaModelInterface>(
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
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'articles',
        key: 'id',
      },
      field: 'article_id',
    },
    originalName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'original_name',
    },
    mimeType: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: 'mime_type',
    },
    size: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    fileData: {
      type: Sequelize.BLOB('medium'),
      allowNull: false,
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
        fields: ['userId', 'atricleId'],
        where: {
          deleted_at: null,
        },
      },
    ],
  },
);

export default articleMediaModel;

articleMediaModel.belongsTo(articleModel, {
  foreignKey: 'articleId',
  as: 'article',
});

articleModel.hasOne(articleMediaModel, {
  foreignKey: 'articleId',
  as: 'medias',
});
