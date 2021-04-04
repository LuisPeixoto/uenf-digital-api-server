const mongoose = require('mongoose')

const { Schema } = mongoose

const postSchema = new Schema({
    title: String,
    date: String,
    url: String,
    categories: String,
    image: String,
    description: String,
})


module.exports = mongoose.model('Post', postSchema)
