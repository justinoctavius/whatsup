const bcrypt = require('bcrypt-nodejs')
const ctrl = {}

ctrl.crypt = (userPassword) =>  {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(userPassword, salt, (err, hash) => {
            return hash;
        });
    });
}

ctrl.compare = async (password, secondPassword) => {
    let allow
    bcrypt.compare(secondPassword, password, (err, result) =>  {
        allow = result
    });
    return allow
}

module.exports = ctrl