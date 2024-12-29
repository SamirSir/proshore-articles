import * as Sequelize from 'sequelize';
import { WhereOptions } from 'sequelize';

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

    public async findOne({ userId }: { userId?: string; }): Promise<ArticleInterface> {
        let where: WhereOptions<any> = {};
        if (userId) where = { ...where, userId: userId };
        return this.repository.findOne({ where });
    }

    public async updateOne(id: Sequelize.CreationOptional<number>, input: Partial<InputArticleInterface>): Promise<ArticleInterface> {
        const articleExists = await this.repository.findByPk(id);
        if (!articleExists) throw new Error(`Article doesn't error`);
        await this.repository.updateOne({ id, input });
        return this.repository.findByPk(id);
    }

    public async deleteOne(id: number): Promise<boolean> {
        const articleExists = await this.repository.findByPk(id);
        if (!articleExists) throw new Error(`Article doesn't error`);
        await this.repository.deleteOne(id);
        return true
    }
}
