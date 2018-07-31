'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    owner: String,
    name: String,
    date: Date,
    location: String
});

ImageSchema.index({name: 1, version: 1}, {unique: true});

ImageSchema.statics.getAllImages = function (owner) {
    return this.find({ 'owner': owner }, 'name')
        .then((result) => {
            if (0 === result.length) {
                return [];
            }
            return separateImages(result);
        });
};

ImageSchema.statics.addImage = function (params, file, owner) {
    const fileInfo = {
        owner: owner,
        name: file.filename,
        date: Date.now(),
        location: params.location
    };
    return this.create(fileInfo)
        .catch(e => {
            let message;
            if (11000 === e.code) {
                message = 'Image with name already exists';
            } else {
                message = 'Can not add image';
            }
            throw new Error(message);
        });
};

const separateImages = (results) => {
    return results.map(result => result._doc.name)
};

const ImageModel = mongoose.model('Image', ImageSchema);

module.exports = ImageModel;
