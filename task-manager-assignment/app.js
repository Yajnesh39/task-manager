const express = require('express');
const bodyParser = require('body-parser');
const routes = require('express').Router();
const taskInfo = require('./routes/taskInfo'); //Import taskInfo module

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.listen( PORT , (error) => {
    if(!error) {
        console.log('Server started succesfully');
    } else {
        console.log('Server Fail !!');
    }
});

app.use(routes);

app.get('/' , (req ,res) => {
    return res.status(200).send('Hello, Welcome to Task Manager');
});

routes.use('/tasks', taskInfo);