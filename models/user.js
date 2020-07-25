const mongoose = require('../database/database');
const crypt = require('../helpers/crypto');
const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        unique: true
    }, 
    email: {
        type: String,
        unique: true
    },
    password: String    
});

module.exports = mongoose.model('user', userSchema);