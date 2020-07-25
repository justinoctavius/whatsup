const { User } = require("../models");

const ctrl = {};

let userData;

ctrl.getData = (req, res) => {
    if(userData){
        res.json({userData: userData.data})
    }else{
        res.json(false)
    }
}

ctrl.setData = (req, res) => {
    userData = req.body
}

ctrl.newUserMessage = (req, res) => {
    res.json({userMessage: global.userMessage, userData: global.userData});
    global.userMessage = '';
}

module.exports = ctrl;