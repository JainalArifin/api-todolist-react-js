const Model = require('../models/Todolist')
const jwt = require('jsonwebtoken')

module.exports = {
    findAll: (req, res) =>{
        Model.find().populate('User')
        .then((dataTodo)=>{
            res.send(dataTodo)
        })
        .catch((err)=>{
            res.send(err)
        })
    },
    findOneUser: (req, res) => {
        Model.find({
            user: req.params.user
        })
        .then((dataUserTodo)=> {
            res.send(dataUserTodo)
        })
        .catch((err) => {
            res.send(err)
        })
    },
    createTodo: (req, res) =>{
        jwt.verify(req.headers.token, process.env.SECRET, (err, dataUser)=>{
            // console.log(dataUser, ' <---- cek user')
            Model.create({
                content: req.body.content,
                status: req.body.status,
                user: dataUser.id
            })
            .then((dataTodo)=>{
                res.send(dataTodo)
            })
            .catch((err)=>{
                res.send(err)
            })
        })
    },
    editTodo: (req, res) =>{
        Model.findOneAndUpdate({
            _id: req.params.id
        },{
            content: req.body.content,
            status: req.body.status
        })
        .then((dataTodo) => {
            res.send(dataTodo)
        })
        .catch((err)=>{
            res.send(err)
        })
    },
    delete: (req, res) =>{
        Model.remove({
            _id: req.params.id
        })
        .then((data)=>{
            // res.send(data)
            res.send('success to delete')
        })
        .then((err)=>{
            res.send(err)
        })
    }
}