const { User } = require("../models");
const { crypt } = require("../helpers");
const ctrl = {};

ctrl.add = async (req, res) => {
    const {username, email, password} = req.body
    const passwordCrypt = crypt.crypt(password);
    User.find({$or: [{username: username}, {email: email}] }, (err, data) => {
        if(err) throw err;
        if(data.length > 0){
            res.json({error: true})
        }else{
            const user = new User({username, email, password: passwordCrypt});
            user.save()
            global.userMessage = `new user has been added: </br> <span class="text-primary">--> ${username}</span>`;
            res.json({userMessage: global.userMessage});
        }
    });
}

module.exports = ctrl;
