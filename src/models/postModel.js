const database = require('../database/execute')


module.exports = {
    async show(page) {
        try {
            var query = `
                SELECT * FROM  posts 
                ORDER BY date DESC
                LIMIT 10 
                OFFSET ${page} ;
            `
            return await database.execute(query)

        } catch (error) {
            if (error) { return res.status(500).send({ error: error }) }
        }


    },

    async insert(data) {
        try {
            const query = `
            INSERT INTO posts(
                title,
                date,
                url,
                categories,
                site,
                image,
                description
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `

            return await database.execute(
                query,
                [
                    data.title,
                    data.date,
                    data.url,
                    data.categories,
                    data.site,
                    data.image,
                    data.description
                ]
            )

        } catch (error) {
            if (error) { return console.log(error)}

        }
    },

    async search(inputSearch, page) {
        try {
            const query =
                `SELECT * FROM posts
                 WHERE title LIKE '%${inputSearch}%'
                 OR description LIKE '%${inputSearch}%' 
                 OR categories LIKE '%${inputSearch}%' 
                 ORDER BY date DESC
                 LIMIT 10 OFFSET ${page}; `

            return await database.execute(query)


        } catch (error) {
            if (error) { return res.status(500).send({ error: error }) }

        }

    },

    async find(title) {
        try {
            const query = `
            SELECT * FROM posts
                WHERE title = '${title}' ;`


            return await database.execute(query)


        } catch (error) {
            if (error) { return res.status(500).send({ error: error }) }

        }

    }

}