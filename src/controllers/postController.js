const { pagination, response } = require("../lib/utils")
const database = require("../models/postModel")
const {checkAndAddPost} = require("../services/PostService")

const postController = {
    async index(req, res) {
        try {
            const page = pagination(req.query.p)
            const data = await database.show(page)

            return res.status(200).json(response(data, req.query.p))

        } catch (error) {
            console.log(error)
            if (error) { return res.status(500).send({ error: error }) }
        }
    },

    async post(req, res) {
        try {
            await checkAndAddPost("https://uenf.br/portal/wp-json/wp/v2/posts?_embed&per_page=15&page=1", "UENF")
            await checkAndAddPost("https://digital.uenf.br/wp-json/wp/v2/posts?_embed&per_page=5&page=1", "UENF DIGITAL")

            return console.log('Concluido')

        } catch (error) {
            if (error) { console.log(error) }
        }
    },
}

module.exports = postController