import * as Sequelize from 'sequelize';

import { ModelTimestampExtend } from '.';

export interface IArticle {
    title: string,
    description: string,
    author: string,
    published: boolean,
}

export interface InputArticleInterface {
    userId: number;
    title: string;
    content?: string;
    imageUrl?: string;
}

export interface ArticleInterface extends InputArticleInterface, ModelTimestampExtend {
    id: Sequelize.CreationOptional<number>;
}

export interface ArticleModelInterface
    extends Sequelize.Model<ArticleInterface, Partial<InputArticleInterface>>,
    ArticleInterface { }
