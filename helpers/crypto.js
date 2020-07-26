const bcrypt = require('bcrypt-nodejs')
const ctrl = {}

ctrl.crypt = (userPassword) =>  {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt, null);
    return hash;
}

ctrl.compare = async (password, secondPassword) => {
    let allow
    bcrypt.compare(secondPassword, password, (err, result) =>  {
        allow = result
    });
    return allow
}

module.exports = ctrl