const UserModel = require('./UserModel');

function errHandler(err) {
    return err.message;
}

function validationErr(err, res) {
    Object.keys(err.errors).forEach(function (k) {
        const msg = err.errors[k].message;
        return res.status(404).json({
            msg: 'Please ensure required fields are filled'});
    });
}

function createNewUser(req, res) {
    return UserModel.create({
        username: req.body.username,
        password: req.body.password,
    }, function (err, user) {
        if(err) {
            if(err.name == 'ValidationError') {
                return validationErr(err, res);
            }
            else {
                return errHandler(err);
            }
        }
        return res.json({
            msg: 'User created!',
            id: user._id,
            username: user.username
        });
    })
}

function findUser(req, res) {
    return UserModel.findOne({username: req.params.username}, 'username',
        function (err, user) {
            if(err) {
                return errHandler(err);
            }
            if(user == null) {
                return res.json({msg: 'User does not exist in the dBase, please' +
                        ' sign up to login as a user'});
            }
            return res.json(user);
        });
}

module.exports = {
    errHandler: errHandler,
    validationErr: validationErr,
    createNewUser: createNewUser,
    findUser: findUser,
};