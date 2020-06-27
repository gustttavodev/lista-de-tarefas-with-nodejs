const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Tarefas = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    prioridade:{
        type: String,
        required: true
    },
    prazo: {
        type: Date,
    }
})

mongoose.model("tarefas", Tarefas)