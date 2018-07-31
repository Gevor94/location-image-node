'use strict';

const passport = require('../../config/passport');
const express = require('express');
const router = express.Router();

const handleResponse = require('../helpers/utils').handleResponse;

const authRoutes = require('./auth');
const imagesRoutes = require('./images');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return handleResponse(res)(null, null, 403);
}

router.use(passport.initialize());
router.use(passport.session());
router.use('/auth', authRoutes);
router.use('/images', /*isLoggedIn,*/ imagesRoutes);

module.exports = router;