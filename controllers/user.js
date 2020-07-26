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
    console.log(global)
}

ctrl.newUserMessage = (req, res) => {
    res.json({userMessage: global.userMessage, userData: userData});
    global.userMessage = '';
}

module.exports = ctrl;