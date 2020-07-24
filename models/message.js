const mongoose = require('../database/database')
const messageSchema = new mongoose.Schema({
        date: {
            type: Date,
            default: Date.now()
        },
        messages: String,
        from: String,
        to: String 
});
module.exports = mongoose.model('messages', messageSchema)