const { User } = require('../models');
const { crypt } = require('../helpers');
const ctrl = {}

ctrl.find = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username: username});
    const allow = crypt.compare(user.password,password);
    if(allow) {
        res.json(user);
    }else{
        res.json(false)
    }
}

module.exports = ctrl;