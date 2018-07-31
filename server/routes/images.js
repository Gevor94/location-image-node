'use strict';
const multer = require('multer');
const path = require('path');
const router = require('express').Router({mergeParams: true});

const controller = require('../controllers/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads/'));
    },
    filename: function (req, file, cb) {
        let ext = '';
        switch (file.mimetype) {
            case 'image/jpeg':
                ext = '.jpeg';
                break;
            case 'image/png':
                ext = '.png';
                break;
            case 'image/gif':
                ext = '.gif';
                break;
        }
        cb(null, file.originalname.slice(0, 4) + Date.now() + ext);
    }
});

const upload = multer({storage: storage});

router.get('', controller.getAllImages);

router.post('', upload.single('file'), controller.addImage);

router.put('/:name', controller.updateImage);

router.delete('/:name', controller.deleteImage);

module.exports = router;