const path = require('path')
const fs = require('fs')

const express = require('express');
const route = express.Router();

const User = require('../models/user')


let userData = {}

//login add
route.post('/api/login',(req,res) => {
    const {username, password} = req.body;
    console.log(username)
    User.find({username: username, password: password},(err,data)=>{
        if(err) throw err;
        console.log(data)
        userData = data
        console.log(userData)
        res.json(data)
    })
});

route.get('/api/register',(req,res) => {
    const {username, email, password} = req.query

    const user = new User({username, email, password});
    user.save()
    console.log(user)
    res.json({user: 'new user has been added'})
})

route.get('/api/chat',(req,res) => {
    res.json(userData)
})



module.exports = route