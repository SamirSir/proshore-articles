import express from "express";
import { ArticleController } from "../controllers";

export const articleRouter = express.Router();

articleRouter.post('/', ArticleController.create);
articleRouter.get('/', ArticleController.list);
articleRouter.get('/:id', ArticleController.get);
articleRouter.put('/:id', ArticleController.update);
articleRouter.delete('/:id', ArticleController.delete);
