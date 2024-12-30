import { CreationOptional, WhereOptions } from 'sequelize';

import { InputArticleInterface, ArticleInterface } from '../interfaces';
import { ArticleRepository } from '../repositories';

export class ArticleService {
    private repository: ArticleRepository;

    constructor() {
        this.repository = new ArticleRepository();
    }

    public async create(input: InputArticleInterface): Promise<ArticleInterface> {
        return this.repository.create(input);
    }

    public async get(id: number): Promise<ArticleInterface> {
        return this.repository.findByPk(id);
    }

    public async list({ userId }: { userId?: string; }): Promise<ArticleInterface[]> {
        let where: WhereOptions<any> = {};
        if (userId) where = { ...where, userId: userId };
        return this.repository.findAll({ where });
    }

    public async update(id: CreationOptional<number>, input: Partial<InputArticleInterface>): Promise<ArticleInterface> {
        const articleExists = await this.repository.findByPk(id);
        if (!articleExists) throw new Error('articleService.notExists.error');
        await this.repository.updateOne({ id, input });
        return this.repository.findByPk(id);
    }

    public async delete(id: number): Promise<boolean> {
        const articleExists = await this.repository.findByPk(id);
        if (!articleExists) throw new Error('articleService.notExists.error');
        await this.repository.deleteOne(id);
        return true
    }
}
