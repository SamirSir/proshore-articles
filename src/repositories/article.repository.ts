import { ArticleInterface, InputArticleInterface } from '../interfaces';
import Models from '../models';
import { BaseRepository } from './base.repository';

export class ArticleRepository extends BaseRepository<InputArticleInterface, ArticleInterface> {
  constructor() {
    super(Models.ArticleModel);
  }
}
