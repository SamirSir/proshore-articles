import { WhereOptions } from 'sequelize';

import { InputArticleMediaInterface, ArticleMediaInterface } from '../interfaces';
import { ArticleMediaRepository } from '../repositories';

export class ArticleMediaService {
    private repository: ArticleMediaRepository;

    constructor() {
        this.repository = new ArticleMediaRepository();
    }

    public async create(input: InputArticleMediaInterface): Promise<ArticleMediaInterface> {
        return this.repository.create(input);
    }

    public async findByPk(id: number): Promise<ArticleMediaInterface> {
        const articleMediaExists = await this.repository.findByPk(id);
        if (!articleMediaExists) throw new Error(`articleMediaService.notExists.error`);
        return articleMediaExists;
    }
}
