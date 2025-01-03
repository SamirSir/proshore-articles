import { CreationOptional, Model } from 'sequelize';

import { ModelTimestampExtend } from '.';

export interface InputArticleInterface {
  userId: number;
  title: string;
  content?: string;
  fileMeta?: object;
  fileData?: Buffer;
}

export interface ArticleInterface extends InputArticleInterface, ModelTimestampExtend {
  id: CreationOptional<number>;
}

export interface ArticleModelInterface
  extends Model<ArticleInterface, Partial<InputArticleInterface>>,
    ArticleInterface {}
