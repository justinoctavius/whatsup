const mongoose = require('../database/database');
const groupsSchema = new mongoose.Schema({ 
    admin: {
        type: String,
        unique: false
    }, 
    name: String,
    members: String,
    group_id: {
        type: String,
        unique: true
    } 
});
module.exports = mongoose.model('Groups', groupsSchema);