const express = require("express")
const app = express()
const morgan = require("morgan")




const routerPosts = require('./routes/posts')

app.use(morgan("dev"))

app.use((req, res, next) => {
    // PERMITI QUAIS SERVIDORES PODEM ACESSAR O MEU SERVIDOR, COMO COLOQUEI * ELE ACEITA TODOS
    res.header("Acess-Control-Allow-Origin", '*')
    // DEFINI QUAIS CABECALHOS O SERVIDOR TEM
    res.header("Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET")
        return res.status(200).send({})
    }

    next()
})

// ROTAS
app.use('/posts', routerPosts)



//QUANDO NAO ENCONTRA ROTA

app.use((req, res, next) => {
    const erro = new Error("ERROR 404")
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app