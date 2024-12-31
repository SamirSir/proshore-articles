import { ArticleMediaInterface, InputArticleMediaInterface } from "../interfaces";
import Models from "../models";
import { BaseRepository } from "./base.repository";

export class ArticleMediaRepository extends BaseRepository<InputArticleMediaInterface, ArticleMediaInterface> {
  constructor() {
    super(Models.ArticleMediaModel);
  }
}
