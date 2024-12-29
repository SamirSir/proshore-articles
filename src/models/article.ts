import { Schema, model, } from 'mongoose';

import { IArticle } from '../interfaces';

const articleSchema = new Schema<IArticle>({
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

export const Article = model<IArticle>('Article', articleSchema);
