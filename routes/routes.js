const express = require('express');
const { login, 
        register, 
        messages, 
        user, 
        groups } = require('../controllers');
const route = express.Router();

//login
route.post('/api/login', login.find);
//register
route.post('/api/register', register.add);
//users
route.get('/api/getUserData', user.getData);
route.post('/api/newUserMessage', user.newUserMessage);
route.post('/api/setUserData', user.setData);
//messages
route.get('/api/getMessages', messages.fetch);
route.post('/api/saveMessages', messages.save);
route.post('/api/deleteMessages', messages.delete);
//groups
route.get('/api/fetchGroups', groups.fetch);
route.post('/api/setGroups', groups.add);
route.post('/api/getGroups', groups.get);
route.post('/api/deleteGroups', groups.delete);
route.post('/api/addMember', groups.addMember)


module.exports = route