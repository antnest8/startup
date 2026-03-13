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

apiRouter.post('/auth/register', async (req, res) => {
    if(await getUser('userName', req.body.user)){
        return res.status(409).send({msg: "Existing User"});
    } else{
        const user = await createUser(req.body);
        await setAuthCookie(res, user);
        return res.status(201).send({msg:`${req.body}`});
    }
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

async function getUser(field, value){
    if(value) {
        return users.find((user) => user[field] === value);
    }
    return null;
}

async function createUser(body){
    const passwordHash = await bcrypt.hash(body.password, 'salty');

    const user = {
        email: body.email,
        userName: body.user,
        displayName: body.displayName,
        password: passwordHash,
    }

    users.push(user);

    return user;
}

async function setAuthCookie(res, user){
    user.token = uuid.v4();

    res.cookie('authToken', user.token, {
        maxAge: 1000 * 60 * 60,
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
}

//listening --------------

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

