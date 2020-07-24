const { Message } = require("../models");
const ctrl = {};

ctrl.fetch = async (req, res) => {
    const message = await Message.find();
    res.json({messages: message})
}

ctrl.save = async (req, res) => {
    const { date, messages, from, to } = req.body.data;
    const message = await new Message({
        date: date,
        messages: messages,
        from: from,
        to: to
    })
    message.save();
    console.log(message)
    res.json({message: 'messages saved'})
}

module.exports = ctrl