const {User} = require("../../models/user");
const bcrypt = require("bcrypt");

const {ControllerWrapper, HttpError} = require("../../utils/index");

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(404, `No user with such email`);
    };

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) {
        throw HttpError(404, `Wrong password`);
    };

    res.status(200).json(user);
};

module.exports = ControllerWrapper(login);