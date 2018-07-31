'use strict';

const handleResponse = require('../helpers/utils').handleResponse;
const passport = require('../../config/passport');

const registerUser = function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            return handleResponse(res)(err, null, 400);
        }
        if (!user || !user._doc) {
            return handleResponse(res)({message: 'Something went wrong during registration'}, null, 400);
        }
        return handleResponse(res)(null, {username: user._doc.username}, 201);
    })(req, res, next);
};

const login = function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return handleResponse(res)({message: 'Wrong username or password'}, null, 404);
        }
        req.login(user, function (err) {
            if (err) {
                return handleResponse(res)(err, null, 400);
            }
            return handleResponse(res)(null, 'OK', 200);
        })
    })(req, res, next)
};

const logout = (req, res) => {
    req.logout();
    req.session.destroy();
    return handleResponse(res)(null,{message: 'ok'}, 200);
};

module.exports = {
    registerUser,
    login,
    logout
};