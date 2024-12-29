export * from './article';

import UserModel from './user.model';
import ArticleModel from './article.model';

// set relations 
// ArticleModel.belongsTo(UserModel);
// UserModel.hasMany(ArticleModel);

const Models = {
  UserModel,
  ArticleModel,
};

export { Models };
