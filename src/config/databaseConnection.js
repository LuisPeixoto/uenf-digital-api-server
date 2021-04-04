const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)

const URI = process.env.MONGO_DB

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology:true,
    })
}

module.exports = connectDB