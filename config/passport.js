const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });
    //register
    passport.use('local-register', new localStrategy(
    function (username, password, done) {
        User.find({username: username}, (err, user) => {
            if(err) {return done(err)}
            if(user) {
                return done(null, false, req.flash('registerMessage', 'That user already exists'))
            }else{
                let newUser = new User();
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                newUser.save((err) => {
                    if(err) throw err;
                    return done(null, newUser)
                });
            }
        });
    }));

    //login
    passport.use('local-login', new localStrategy(
    function (username, password, done) {
        User.find({username: username}, (err, user) => {
            if(err) {
                return done(err)
            }
            if(!user) {
                return done(null, false, req.flash('loginMessage', 'user doesn\'t exists '))
            }else if(!user.validatePassword(password)){
                return done(null, false, req.flash('loginMessage', 'Wrong Password'));
            }else{
                return done(null, user);
            }
        });
    }));

}