const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const moment = require('moment')

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/blogtarefas").then(() => {
    console.log("Conectado com sucesso !")
}).catch((err) => {
    console.log(`Houve um erro ${err}`)
})



// configurando body-Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Pasta de arquivos estaticos
app.use(express.static('public'));
app.set('views', path.join(__dirname + '/views'))

app.engine('handlebars', handlebars({defaultLayout: 'main', helpers:{
    formatDate: (date) => {
        return moment(date).format('DD/MM/YYYY')
    }
}}))
app.set('view engine', 'handlebars')




app.use("/", routes)




app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})