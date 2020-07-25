const mongoose = require('../database/database');
const groupsSchema = new mongoose.Schema({ 
    admin: {
        type: String,
    }, 
    name: String,
    members: Array,
    group_id: {
        type: String,
        unique: true
    } 
});
module.exports = mongoose.model('Groups', groupsSchema);