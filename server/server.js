var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/User');
var {Todo} = require('./models/Todo');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((result) => {
        console.log("Todo Created");
        res.status(200).send(result);
    }, (err) => {
        console.log("Todo creation failed");
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({
            result: "Todo not found!"
        });
    }
    Todo.findById(id).then((result) => {
        if(result) {
            res.status(200).send({
                result: "Todo found",
                todo: result
            })
        } else {
            res.status(404).send({
                result: "Todo not found"
            })
        }
        
    }, (error) => {
        res.status(400).send({
            result: "Some error occured"
        })
    });
});


app.listen(port, () => {
    console.log("Server sarted on port ",port);
});

module.exports = {app};