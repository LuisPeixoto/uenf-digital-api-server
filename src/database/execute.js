const {pool} = require('../config/databaseConnection')

exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result) => {
            if (error) {
                console.log(error)
                reject(error)

            } else {
                resolve(result)
            }
        })
    })
}
