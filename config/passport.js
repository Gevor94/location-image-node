const passport = require('passport');
const User = require('../server/models/UserModel');
const utilities = require('../server/models/Utilities');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.error('There was an error accessing the records of' +
                ' user with id: ' + id);
            return console.log(err.message);
        }
        return done(null, user);
    })
});

passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'pwd',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        process.nextTick(function() {
            User.findOne({username: username}, function(err, user) {
                if(err) {
                    return utilities.errHandler(err);
                }
                if(user) {
                    console.log('user already exists');
                    return done(null, false, {errMsg: 'username already exists'});
                }
                else {
                    const newUser = new User();
                    newUser.username = req.body.username;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function(err) {
                        if(err) {
                            if(err.message === 'User validation failed') {
                                return done(null, false, {errMsg: 'Please fill all fields'});
                            }
                            return utilities.errHandler(err);
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'pwd',
        passReqToCallback: true
    },
    function (req, username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return utilities.errHandler(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.validPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });

    }));

module.exports = passport;