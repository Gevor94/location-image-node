'use strict';

const merge = require('merge');

const envSettings = require('./envSettings');

const defaultSettings = {
    env: "development",
    port: 3003
};

const getSettings = () => {
    envSettings.env = process.env.NODE_ENV ? process.env.NODE_ENV : envSettings.env;
    return merge.recursive(true, defaultSettings, envSettings);;
};

module.exports = getSettings();