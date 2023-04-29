const {User} = require("../../models/user")

const {ControllerWrapper, HttpError} = require("../../utils/index");

const register = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, `User with email ${email} already exists`);
    };

    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
};

module.exports = ControllerWrapper(register);