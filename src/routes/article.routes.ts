import express from "express";
import { ArticleController } from "../controllers";

export const articleRouter = express.Router();

articleRouter.post('/', ArticleController.addArticle);
articleRouter.get('/', ArticleController.getArticles);
articleRouter.get('/:id', ArticleController.getArticle);
articleRouter.put('/:id', ArticleController.updateArticle);
articleRouter.delete('/:id', ArticleController.deleteArticle);
