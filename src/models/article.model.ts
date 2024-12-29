import * as Sequelize from 'sequelize';
import { ArticleModelInterface } from '../interfaces';

export default (sequelize: Sequelize.Sequelize) => {
    const Article = sequelize.define<ArticleModelInterface>(
        'articles',
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                field: 'user_id',
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
            },
            imageUrl: {
                type: Sequelize.STRING,
                field: 'image_url'
            },
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );
    return Article;
};
