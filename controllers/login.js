const { User } = require('../models')
const ctrl = {}

ctrl.find = (req, res) => {
    const { username, password } = req.body;
    User.find({username: username, password: password},(err,data) => {
        if(err) throw err;
        res.json(data);
    });
}

module.exports = ctrl;