const database = require('../models/postSchema')

module.exports = {

    async show(page) {
        try {
            const limit = 10
            return await database.find({categories:{$not:{$eq:'Associações estudantis'}}})
                .limit(limit * 1)
                .skip(page)
                .sort({ date: -1 })

        } catch (error) {
            if (error) { return console.log('Erro', error) }
        }
    },

    async insert(data) {
        try {
            var data = new database(data)
            data.save((err, data) => {
                if (err) {
                    return console.log(err)
                }
            })

        } catch (error) {
            if (error) { return console.log('Erro', error) }
        }
    },

    async search(inputSearch, page) {
        try {
            const limit = 10
            return await database.find(
                {
                    $or: [
                        { title: RegExp(inputSearch, 'i') },
                        { description: RegExp(inputSearch, 'i') },
                        { categories: RegExp(inputSearch, 'i') }
                    ]
                })
                .limit(limit * 1)
                .skip(page)
                .sort({ date: -1 })

        } catch (error) {
            if (error) { return console.log('Erro', error) }
        }
    },

    async find(title) {
        try {
            return await database.findOne({ 'title': title })

        } catch (error) {
            if (error) { return console.log('Erro', error) }
        }
    }
}