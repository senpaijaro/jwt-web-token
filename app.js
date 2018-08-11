const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res ) => {
        res.json({
            message: "Welcome to the api"
        })
})

app.post('/api/post', checkToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post Created',
                authData: authData
            })
        }
    })
   
})

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'jade',
        emai: 'jadebatal@yahoo.com'
    }

    jwt.sign({user: user}, 'secretkey', {expiresIn: '20s'}, (err, token) => {
        res.json({
            token:token
        })
    })
})

//format of token
//authorization: bearer <access_token>

//check token
function checkToken(req, res, next){
    //get auh header value
    const token = req.headers['authorization']
    if(typeof(token) !== 'undefined'){
        //set token
        console.log(token)
        req.token = token
        //next moddleware
        next()
    } else {
        // Forbidden
        res.sendStatus(403)
    }
}

app.listen(5000, function(){
    console.log('Welcome to port 5000')
})