const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Tarefas")
const Tarefa = mongoose.model("tarefas")



router.get("/", (req,res) => {
    res.render('home')
})


router.get("/tarefas", (req,res) => {
    Tarefa.find().sort({prazo: 'desc'}).then((tarefas) => {
        res.render('tarefas', {tarefas: tarefas})
        
    }).catch((err) => {
        res.send(`Houve um erro ${err}`)
        res.redirect("/tarefas")
    })
})

router.get("/addtarefas", (req,res) => {
    res.render('addtarefas')
})


router.get("/tarefas/edit/:id", (req,res) => {
    Tarefa.findOne({_id:req.params.id}).lean().then((tarefa) => {
        res.render('edittarefas', {tarefa: tarefa})
    }).catch((err) => {
        res.send("Essa categoria não existe")
        res.redirect("/tarefas")
    })
})

router.post("/tarefas/edit", (req,res) => {
    Tarefa.findOne({_id: req.body.id}).then((tarefa) => {
        tarefa.titulo = req.body.titulo
        tarefa.descricao = req.body.descricao
        tarefa.prioridade = req.body.prioridade
        tarefa.prazo = req.body.prazo
        //salvando edição
        tarefa.save().then(() => {
            res.redirect("/tarefas")
        }).catch((err) => {
            res.send(`Houve um erro ao salvar ${err}`)
        })

    }).catch((err) => {
        res.send("Houe um erro ao editar")
    })
})

router.post("/tarefas/deletar", (req,res) => {
    Tarefa.remove({_id: req.body.id}).then(() => {
        res.redirect("/tarefas")
    }).catch((err) => {
        res.send(`Houve um erro ${err}`)
    })
})



router.post("/tarefa/nova", (req,res) => {
    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        res.send("Titilo invalido")
        res.redirect("/tarefas")
    }
    if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null){
        res.send("Descricao invalido")
        res.redirect("/tarefas")
    }

    if(!req.body.prioridade || typeof req.body.prioridade == undefined || req.body.prioridade == null){
        res.send("Houve um erro ao selecionar sua prioridade")
        res.redirect("/tarefas")
    }

    if(!req.body.prazo || typeof req.body.prazo == undefined || req.body.prazo == null){
        res.send("prazo invalido")
        res.redirect("/tarefas")
    } else {
        const novaTarefa = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            prioridade: req.body.prioridade,
            prazo: req.body.prazo
        }
        new Tarefa(novaTarefa).save().then(() => {
            console.log("Categoria salva !")
            res.redirect("/tarefas")
        }).catch((err) => {
            console.log(`Houve um erro ao salvar a tarefa :( ${err})`)
            res.send("Houve um erro interno")
        })
    }

})


module.exports = router