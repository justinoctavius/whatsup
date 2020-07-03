const mongoose = require('../database/messageDb')
const messageSchema = new mongoose.Schema({
        date: String,
        messages: String,
        from: String,
        to: String 
});
module.exports = mongoose.model('messages', messageSchema)