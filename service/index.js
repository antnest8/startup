const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();


//setup -------------
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const users = [];


//routing --------------
app.use(express.json());

app.use(cookieParser())

app.use(express.static('public'))

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/register', (req, res) => {
    return res.status(201).send({'msg':'register endpoint reached!'});
});

apiRouter.post('/auth/login', (req, res) => {
    return res.status(200).send({'msg':'login endpoint reached!'});
});

apiRouter.delete('/auth/login', (req, res) => {
    return res.status(200).send({'msg':'logout endpoint reached!'});
});

apiRouter.delete('/auth/login', (req, res) => {
    return res.status(200).send({'msg':'logout endpoint reached!'});
});

apiRouter.get('/auth/check', (req, res) => {
    return res.status(200).send({'msg':'authentication check reached!'}); 
});

apiRouter.get('/user/data', checkAuth, (req, res) => {
    return res.status(200).send({'msg':"user info endpoint reached"})
})

app.use(function (err, req, res, next){
    res.status(500).send({type : err.name, message : err.message});
})

//utility functions -------------
async function checkAuth(req, res, next){
    //TODO: check
}

async function setAuthCookie(){
    
}

//listening --------------

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

