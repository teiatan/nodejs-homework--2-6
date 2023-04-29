const {User} = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {ControllerWrapper, HttpError} = require("../../utils/index");

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, `No user with such email`);
    };

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) {
        throw HttpError(401, `Wrong password`);
    };

    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

    res.status(200).json({token: token, user: user});
};

module.exports = ControllerWrapper(login);