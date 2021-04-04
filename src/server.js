const http = require('http')
const app = require("./app")
const config = require("./config")
const connectDB = require('./config/databaseConnection')

connectDB();

const server = http.createServer(app)


server.listen(config.app.port)

