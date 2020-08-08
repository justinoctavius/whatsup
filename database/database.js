const mongoose = require('mongoose');
const URL = 'mongodb+srv://octavius:8092310justin@cluster0.0tpyx.mongodb.net/whatsup?retryWrites=true&w=majority';
const devURL = 'mongodb://localhost/chat'

mongoose.connect(URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(res => console.log('db is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;