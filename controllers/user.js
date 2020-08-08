const cookie = require('js-cookie');
const ctrl = {};

ctrl.newUserMessage = (req, res) => {
    res.json({userMessage: global.userMessage});
    global.userMessage = '';
}

module.exports = ctrl;