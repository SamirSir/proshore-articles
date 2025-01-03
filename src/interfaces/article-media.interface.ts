import { CreationOptional, Model } from 'sequelize';

import { ModelTimestampExtend } from '.';

export interface InputArticleMediaInterface {
  userId: number;
  articleId: number;
  originalName: string;
  mimeType: string;
  size: number;
  fileData: Buffer;
}

export interface ArticleMediaInterface extends InputArticleMediaInterface, ModelTimestampExtend {
  id: CreationOptional<number>;
}

export interface ArticleMediaModelInterface
  extends Model<ArticleMediaInterface, Partial<InputArticleMediaInterface>>,
    ArticleMediaInterface {}
