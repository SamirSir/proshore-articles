import express from "express";
import multer from "multer";

import { ArticleController } from "../controllers";
import { AuthGuard } from "../middlewares";

const upload = multer({ dest: "public/uploads/" })

export const articleRouter = express.Router();

articleRouter.post('/', AuthGuard.authenticate, upload.single('file'), ArticleController.create);
articleRouter.get('/', AuthGuard.authenticate, ArticleController.list);
articleRouter.get('/:id', AuthGuard.authenticate, ArticleController.get);
articleRouter.put('/:id', AuthGuard.authenticate, upload.single('file'), ArticleController.update);
articleRouter.delete('/:id', AuthGuard.authenticate, ArticleController.delete);
