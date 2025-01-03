import { CreationOptional, Order, WhereOptions } from 'sequelize';

import { InputArticleInterface, ArticleInterface } from '../interfaces';
import { ArticleRepository } from '../repositories';
import { SortEnum } from '../enums';

export class ArticleService {
  private repository: ArticleRepository;

  constructor() {
    this.repository = new ArticleRepository();
  }

  public async create(input: InputArticleInterface): Promise<ArticleInterface> {
    return this.repository.create(input);
  }

  public async findByPk(id: number): Promise<ArticleInterface> {
    const articleExists = await this.repository.findByPk(id);
    if (!articleExists) throw new Error(`articleService.notExists.error`);
    return articleExists;
  }

  public async findAll({ userId }: { userId?: string }): Promise<ArticleInterface[]> {
    let where: WhereOptions<any> = {};
    if (userId) where = { ...where, userId };
    return this.repository.findAll({ where });
  }

  public async findAndCountAll({
    offset,
    limit,
    sort,
    order,
    userId,
  }: {
    offset: number;
    limit: number;
    sort: string;
    order: SortEnum;
    userId: number;
  }): Promise<{
    count: number;
    rows: ArticleInterface[];
  }> {
    let where: WhereOptions<any> = {},
      orderItem: Order = [];
    if (order && sort) orderItem = [...orderItem, [sort, order]];
    if (userId) where = { ...where, userId };

    return this.repository.findAndCountAll({
      where,
      offset,
      limit,
      order: orderItem,
      distinct: true,
    });
  }

  public async updateOne(
    id: CreationOptional<number>,
    input: Partial<InputArticleInterface>,
  ): Promise<ArticleInterface> {
    const articleExists = await this.repository.findByPk(id);
    if (!articleExists) throw new Error('articleService.notExists.error');
    await this.repository.updateOne({ id, input });
    return this.repository.findByPk(id);
  }

  public async deleteOne(id: number): Promise<boolean> {
    const articleExists = await this.repository.findByPk(id);
    if (!articleExists) throw new Error('articleService.notExists.error');
    await this.repository.deleteOne(id);
    return true;
  }
}
