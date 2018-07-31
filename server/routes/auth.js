'use strict';

const passport = require('../../config/passport');
const router = require('express').Router({mergeParams: true});

const controller = require('../controllers/auth');

router.post('/signup', controller.registerUser);

router.post('/login', controller.login);

router.get('/logout', controller.logout);

module.exports = router;