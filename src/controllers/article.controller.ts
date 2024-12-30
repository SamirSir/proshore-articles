import { Request, Response } from 'express';

import { ArticleService } from '../services';
import { ArticleValidator } from '../validators';

export class ArticleController {
    public static async create(req: Request, res: Response) {
        const data = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            published: req.body.published
        }
        const { error, value } = ArticleValidator.validate(data);
        
        if (error) {
            res.send(error.message);
        } else {
            const article = await new ArticleService().create(value);
            res.status(201).send(article);
        }
    }

    public static async get(req: Request, res: Response) {
        const id = +req.params.id;
        const article = await new ArticleService().get(id);
        res.send(article);
    }

    public static async list(req: Request, res: Response) {
        const articles = await new ArticleService().list({});
        res.send(articles);
    }

    public static async update(req: Request, res: Response) {
        const id = +req.params.id;
        const article = await new ArticleService().update(id, req.body);
        res.send(article);
    }

    public static async delete(req: Request, res: Response) {
        const id = +req.params.id;
        await new ArticleService().delete(id);
        res.send('article deleted');
    }
}
