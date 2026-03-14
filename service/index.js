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

app.use((req, res, next) => {
    console.log(`Full request JSON: ${JSON.stringify(req.body)}`)
    next();
});

const apiRouter = express.Router();
app.use('/api', apiRouter);

//register new user endpoint
apiRouter.post('/auth/register', async (req, res) => {
    if(await getUser('userName', req.body.user)){
        return res.status(409).send({msg: "Existing User"});
    } else{
        const user = await createUser(req.body);
        setAuthCookie(res, user);
        return res.status(201).send({msg:`${req.body}`});
    }
});

//login endpoint
apiRouter.post('/auth/login', async (req, res) => {
    const user = await getUser("userName", req.body.user)

    if(user && (await bcrypt.compare(req.body.password, user.password))){
        setAuthCookie(res, user);

        return  res.status(200).send({'msg':'login endpoint reached!'});
    }
    
    return res.status(401).send({msg:"Login failed"});
});

//logout endpoint
apiRouter.delete('/auth/login', async (req, res) => {
    const user = await getUser("token", req.cookies['authToken']);
    const token = req.cookies['authToken'];

    if(user){
        delete user.token;
        res.clearCookie('authToken');
    }

    return res.status(200).send({'msg':'logout succesfull'});
});

//"checks if token is still valid"
apiRouter.get('/auth/check', checkAuth, async (req, res) => {
    return res.status(200).send({'msg':'valid token'});
});

//the "GetMe" endpoint
apiRouter.get('/user/data', checkAuth, async (req, res) => {
    const user = await getUser('token', req.cookies['authToken']);
    //console.log(`user/data returned user ${JSON.stringify(user)}`)
    if(user){
        //console.log(`GetMe user check ${Object.keys(user).length}`)
        return res.status(200).send({
            "msg" : `Token Valid, user info below...`,
            "user" : user.userName,
            "displayName" : user.displayName,
            "initials" : user.initials,
            "email" : user.email,
        });
    } else{
        return res.status(401).send({'msg':"Invalid token"});
    }

})

apiRouter.put('user/data/:field', checkAuth, async (req, res) => {
    const user = await getUser('token', req.cookies['authToken']);
    
    if(req.params.field != 'password' && user[req.params.field]){
        user[req.params.field] = req.body.value;
        return res.status(200).send({msg:`${req.params.field}:${user[req.params.field]}`})
    }else if(req.params.field == 'password'){
        const newHash = bcrypt.hash(req.body.value, 10);
        user["password"] = newHash;
        return res.status(200).send({msg:"Password:[hidden]"});
    }
    else {
        return res.status(404).send({msg:`${req.params.field} is not a field`});
    }


})

app.use(function (err, req, res, next){
    res.status(500).send({type : err.name, message : err.message});
})

//utility functions -------------
async function checkAuth(req, res, next){
    if(await getUser('token', req.cookies['authToken'])){
        next();
    } else{
        return res.status(401).send({msg : "Invalid Authorization Token. Cannot Access endpoint."});
    }
}

async function getUser(field, value){
    if(value) { 
        const user = users.find((user) => user[field] === value);
        //console.log(`users getUser debug: ${JSON.stringify(user)}`)
        return user;
    }
    return null;
}

async function createUser(body){
    const passwordHash = await bcrypt.hash(body.password, 10);

    const user = {
        email: body.email,
        userName: body.user,
        displayName: body.displayName,
        initials: body.initials,
        password: passwordHash,
    }

    //console.log(Object.keys(user).length);

    users.push(user);

    return user;
}

function setAuthCookie(res, user){
    user.token = uuid.v4();
    //console.log(`authCookie user check: ${Object.keys(user).length}`)
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

