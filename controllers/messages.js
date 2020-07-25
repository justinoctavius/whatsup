const { Message } = require("../models");
const ctrl = {};

ctrl.fetch = async (req, res) => {
    const message = await Message.find();
    if(message.length > 0){
        res.json({messages: message})
    }else{
        res.json(false)
    }
}

ctrl.save = async (req, res) => {
    const { date, messages, from, to } = req.body;
    console.log(req.body,'save message')
    const message = new Message({
        date: date,
        messages: messages,
        from: from,
        to: to
    })
    message.save();
    console.log(message)
    res.json({message: 'messages saved'})
}

ctrl.delete = async (req, res) => {
    const { to } = req.body;
    const message = await Message.findOne({to: to});
    if(message){
        await Message.deleteMany({to: to});
        res.json({message: 'delete message successfully'});
    }else{
        res.json({message: 'message not found'});

    }
}

module.exports = ctrl