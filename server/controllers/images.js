'use strict';

const ImageModel = require('../models/ImageModel');
const handleResponse = require('../helpers/utils').handleResponse;

const getAllImages = (req, res) => {
    ImageModel.getAllImages(req.query.name)
        .then(result => handleResponse(res)(null, result, 200))
        .catch(error => handleResponse(res)(error, null, 400));
};

const addImage = (req, res) => {
    ImageModel.addImage(req.body, req.file)
        .then(result => handleResponse(res)(null, result, 200))
        .catch(error => handleResponse(res)(error, null, 400));
};

const updateImage = (req, res) => {
    ImageModel.updateImage()
        .then(result => handleResponse(res)(null, result, 200))
        .catch(error => handleResponse(res)(error, null, 400));
};

const deleteImage = (req, res) => {
    ImageModel.deleteImage()
        .then(result => handleResponse(res)(null, result, 200))
        .catch(error => handleResponse(res)(error, null, 400));
};

module.exports = {
    getAllImages,
    addImage,
    updateImage,
    deleteImage
};