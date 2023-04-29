const {User} = require("../../models/user")

const {ControllerWrapper} = require("../../utils/index");

const register = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
};

module.exports = ControllerWrapper(register);