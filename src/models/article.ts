import { Schema, model, } from 'mongoose';

import { ArticleInterface } from '../interfaces';

const articleSchema = new Schema<ArticleInterface>({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
});

export const Article = model<ArticleInterface>('Article', articleSchema);
