import { Response } from 'express';
import * as fs from 'fs';

import { createArticleValidator, updateArticleValidator } from '../validators';
import { UserRequestInterface } from '../interfaces';
import { ArticleService } from '../services';
import { PaginationUtil } from '../utils';

export class ArticleController {
    public static async create(req: UserRequestInterface, res: Response) {
        try {
            const data = {
                title: req.body.title,
                content: req.body.content,
                file: req.file,
            };
            const { error, value } = createArticleValidator.validate(data);
            if (error) {
                res.status(400).send(error.message);
            } else {
                const fileData = fs.readFileSync(data.file!.path);
                const article = await new ArticleService().create({
                    ...data,
                    userId: req.currentUser?.id!,
                    fileMeta: data.file,
                    fileData
                });
                fs.unlinkSync(data.file!.path);
                res.status(201).send({ message: 'Article created successfully ', data: article });
            }
        } catch (error: any) {
            console.error('article.create.error', error);
            res.status(500).send('Error creating article');
        }
    }

    public static async get(req: UserRequestInterface, res: Response) {
        try {
            const id = +req.params.id;
            const article = await new ArticleService().findByPk(id);
            res.status(200).send({ message: "Article fetched successfully!", data: article });
        } catch (error: any) {
            console.error('article.get.error', error);
            res.status(500).send('Failed to fetch article!');
        }
    }

    public static async list(req: UserRequestInterface, res: Response) {
        try {
            const userId = req.currentUser?.id!;
            const { offset, limit, sort, order } = PaginationUtil.parseQueryParams(req.query);
            const articles = await new ArticleService().findAndCountAll({
                offset,
                limit,
                sort,
                order,
                userId,
            });
            res.status(200).send({ message: "Articles fetched successfully!", data: articles });
        } catch (error: any) {
            console.error('article.list.error', error);
            res.status(500).send('Failed to list article!');
        }
    }

    public static async update(req: UserRequestInterface, res: Response) {
        try {
            const id = +req.params.id;
            const data = {
                title: req.body.title,
                content: req.body.content,
                file: req.file
            };
            const { error, value } = updateArticleValidator.validate(data);
            if (error) {
                res.status(400).send(error.message);
            } else {
                let updateArticleParams = value;
                if (req.file) {
                    const fileData = fs.readFileSync(req.file!.path);
                    Object.assign(updateArticleParams, {
                        ...updateArticleParams, fileMeta: req.file,
                        fileData
                    });
                }
                const article = await new ArticleService().updateOne(id, updateArticleParams);
                if (req.file) fs.unlinkSync(req.file!.path);
                res.status(200).send({ message: 'Article updated successfully ', data: article });
            }
        } catch (error: any) {
            console.error('article.update.error', error);
            res.status(500).send('Error updating article');
        }
    }

    public static async delete(req: UserRequestInterface, res: Response) {
        try {
            const id = +req.params.id;
            await new ArticleService().deleteOne(id);
            res.status(200).send({ message: "Article deleted successfully!", data: undefined });
        } catch (error: any) {
            console.error('article.delete.error', error);
            res.status(500).send('Failed to delete article!');
        }
    }
}
