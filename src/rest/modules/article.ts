import Article from '@database/table/article'
import Tag from '@database/table/tag'
import { FastifyRequest } from 'fastify'
import { FastifyInstance } from 'fastify'
import { send, sendFile } from '../rest'

type articleId = FastifyRequest<{
    Params: {
        id: number
    }
}>

type articleSearch = FastifyRequest<{
    Querystring: {
        page: number
    }
}>

export default async(rest: FastifyInstance) => {

    rest.get('/article', async (request: articleSearch, reply) => {
        Article.findAll({
            limit: 5,
            offset: ((request.query && isFinite(request.query.page) ? request.query.page : 0) - 1) * 5 
        }).then((e) => {
            if (e.length == 0)
                send(reply, "Success", 200, e)
                
            e.forEach(e => { 
                var v = e.description.substring(0, 200); 
                e.description = v.slice(0, v.lastIndexOf(' ')) + "...";
                Tag.findAll({
                    where: { articleId: e.id }
                }).then(tags => {
                    e.setDataValue('tags', tags.map(e => e.name))
                    send(reply, "Success", 200, e)
                })
            })
        }, (e) => {send(reply, "Internal Error", 500); console.log(e) } )
    })

    rest.get('/article/:id', async (request: articleId, reply) => {
        if (!request.params || !isFinite(request.params.id))
            return send(reply, "Invalid Article Id", 401)
        Article.findOne({
            where: { id: request.params.id }
        }).then((e) => {
            if (!e)
                return send(reply, "Success", 200, e);

            Tag.findAll({
                where: { articleId: e.id }
            }).then(tags => {
                e.setDataValue('tags', tags.map(e => e.name))
                send(reply, "Success", 200, e)
            })
        }, (e) => {send(reply, "Internal Error", 500); console.log(e) } )
    })


    rest.get('/article/page_count', async (request, reply) => {
        Article.count({
            distinct: true,
            col: 'article.id'
        }).then((e) => {
            send(reply, "Success", 200, { pageCount: Math.ceil(e / 5) })
        }, (e) => {send(reply, "Internal Error", 500); console.log(e) } )
    })

    rest.get('/article/:id/img', async (request: articleId, reply) => {
        sendFile(reply, "data/articles/" + request.params.id)
    })
}