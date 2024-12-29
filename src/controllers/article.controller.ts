import { Request, Response } from 'express';

import { ArticleService } from '../services';
import { ArticleValidator } from '../validators';

export class ArticleController {
    public static async addArticle(req: Request, res: Response) {
        const data = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            published: req.body.published
        }
        const { error, value } = ArticleValidator.validate(data)

        if (error) {
            res.send(error.message)

        } else {
            const article = await new ArticleService().createArticle(value)
            res.status(201).send(article)
        }
    }

    public static async getArticle(req: Request, res: Response) {
        const id = req.params.id
        const article = await new ArticleService().getArticle(id)
        res.send(article)
    }

    public static async getArticles(req: Request, res: Response) {
        const articles = await new ArticleService().getArticles()
        res.send(articles)
    }

    public static async updateArticle(req: Request, res: Response) {
        const id = req.params.id
        const article = await new ArticleService().updateArticle(id, req.body)
        res.send(article)
    }

    public static async deleteArticle(req: Request, res: Response) {
        const id = req.params.id
        await new ArticleService().deleteArticle(id)
        res.send('article deleted')
    }
}
