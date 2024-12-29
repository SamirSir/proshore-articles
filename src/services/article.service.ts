import { Article, } from '../models'

export class ArticleService {
    async createArticle(data: any) {
        try {
            const newArticle = await Article.create(data)
            return newArticle
        } catch (error) {
            console.log(error)
        }
    }

    async getArticles() {
        try {
            const articles = await Article.find({})
            return articles
        } catch (error) {
            console.log(error)
        }
    }

    async getArticle(id: string) {
        try {
            const article = await Article.findById({ _id: id })
            if (!article) {
                return 'article not available'
            }
            return article
        } catch (error) {
            console.log(error)
        }
    }

    async updateArticle(id: string, data: any) {
        try {
            //pass the id of the object you want to update
            //data is for the new body you are updating the old one with
            //new:true, so the dats being returned, is the update one
            const articlez = await Article.findByIdAndUpdate({ _id: id }, data, { new: true })
            if (!articlez) {
                return "article not available"
            }
            return articlez
        } catch (error) {
            console.log(error)
        }
    }

    async deleteArticle(id: string) {
        try {
            const article = await Article.findByIdAndDelete(id)
            if (!article) {
                return 'article not available'
            }
        } catch (error) {
            console.log(error)
        }
    }
}
