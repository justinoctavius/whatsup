const mongoose = require('mongoose');
const URL = 'mongodb://localhost/user';

mongoose.connect(URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(res => console.log('db is connected'))
    .catch(err => console.log(err));

module.exports = mongoose;