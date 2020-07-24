const { User } = require("../models");
const ctrl = {};

ctrl.add = (req, res) => {
    const {username, email, password} = req.body

    User.find({$or: [{username: username}, {email: email}] }, (err, data) => {
        if(err) throw err;
        if(data.length > 0){
            res.json({error: 'That user alright exist'})
        }else{
            const user = new User({username, email, password});
            user.save()
            global.userMessage = `new user has been added: ${username}`;
            res.json({userMessage: global.userMessage});
        }
    });
}

module.exports = ctrl;
