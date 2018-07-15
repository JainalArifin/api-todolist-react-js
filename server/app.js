const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
// routes
const user = require('./routes/User')
const todo = require('./routes/Todolist')

// conection to mongoose
mongoose.connect(`mongodb://jainal3:pakuhaji@cluster0-shard-00-00-1w09b.mongodb.net:27017,cluster0-shard-00-01-1w09b.mongodb.net:27017,cluster0-shard-00-02-1w09b.mongodb.net:27017/todo-list-reactjs?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`)

// test connection database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('running database')
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use midleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// midleware for connection to route
app.use('/user', user)
app.use('/todo', todo)

app.get('/', (req, res)=>{
    res.send('Hello world')
})

app.listen(3330, ()=>{
    console.log('listen port on 3330')
})