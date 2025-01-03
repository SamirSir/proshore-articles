import { Response } from 'express';
import * as fs from 'fs';

import { createArticleValidator, updateArticleValidator } from '../validators';
import { UserRequestInterface } from '../interfaces';
import { ArticleService } from '../services';
import { PaginationUtil } from '../utils';

export class ArticleController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async create(req: UserRequestInterface, res: Response): Promise<any> {
    try {
      const data = {
        title: req.body.title,
        content: req.body.content,
        file: req.file,
      };
      const { error } = createArticleValidator.validate(data);
      if (error) return res.status(400).json({ message: error.message });
      const fileData = fs.readFileSync(data.file!.path);
      const article = await new ArticleService().create({
        ...data,
        userId: Number(req.currentUser?.id),
        fileMeta: data.file,
        fileData,
      });
      fs.unlinkSync(data.file!.path);
      return res.status(201).json({ message: 'Article created successfully ', data: article });
    } catch (error) {
      console.error('article.create.error', error);
      return res.status(500).json({ message: 'Error creating article' });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async get(req: UserRequestInterface, res: Response): Promise<any> {
    try {
      const id = +req.params.id;
      const article = await new ArticleService().findByPk(id);
      return res.status(200).json({ message: 'Article fetched successfully!', data: article });
    } catch (error) {
      console.error('article.get.error', error);
      return res.status(500).json({ message: 'Failed to fetch article!' });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async list(req: UserRequestInterface, res: Response): Promise<any> {
    try {
      const { offset, limit, sort, order } = PaginationUtil.parseQueryParams(req.query);
      const articles = await new ArticleService().findAndCountAll({
        offset,
        limit,
        sort,
        order,
        userId: Number(req.currentUser?.id),
      });
      return res.status(200).json({ message: 'Articles fetched successfully!', data: articles });
    } catch (error) {
      console.error('article.list.error', error);
      return res.status(500).json({ message: 'Failed to list article!' });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async update(req: UserRequestInterface, res: Response): Promise<any> {
    try {
      const id = +req.params.id;
      const data = {
        title: req.body.title,
        content: req.body.content,
        file: req.file,
      };
      const { error, value } = updateArticleValidator.validate(data);
      if (error) return res.status(400).json({ message: error.message });
      const updateArticleParams = value;
      if (req.file) {
        const fileData = fs.readFileSync(req.file!.path);
        Object.assign(updateArticleParams, {
          ...updateArticleParams,
          fileMeta: req.file,
          fileData,
        });
      }
      const article = await new ArticleService().updateOne(id, updateArticleParams);
      if (req.file) fs.unlinkSync(req.file!.path);
      return res.status(200).json({ message: 'Article updated successfully ', data: article });
    } catch (error) {
      console.error('article.update.error', error);
      return res.status(500).json({ message: 'Error updating article' });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async delete(req: UserRequestInterface, res: Response): Promise<any> {
    try {
      const id = +req.params.id;
      await new ArticleService().deleteOne(id);
      return res.status(200).json({ message: 'Article deleted successfully!', data: undefined });
    } catch (error) {
      console.error('article.delete.error', error);
      return res.status(500).json({ message: 'Failed to delete article!' });
    }
  }
}
