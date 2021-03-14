const { pagination, fixTextFormat, response } = require("../lib/utils")
const database = require("../models/postModel")

const searchController = {
    async show(req, res) {
        try {
            let { q, p } = req.query

            const page = pagination(p)

            const data = await database.search(q, page)

            if (data.length > 0 && q.length>0) {
                return res.status(200).json(response(data, p))
                
            } else {
                return res.status(404).json(`Nenhum resultado encontrado para ${q}`)
            }

        } catch (error) {
            console.log(error)
            if (error) { return res.status(500).send({ error: error }) }

        }

    }
}
module.exports = searchController

