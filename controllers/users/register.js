const {User} = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

const {ControllerWrapper, HttpError} = require("../../utils/index");

const register = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const {email, password} = req.body;
    
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, `User with email ${email} already exists`);
    };

    const avatarURL = gravatar.url(email, { s: "100", r: "x" }, false);

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({...req.body, password: hashPassword, avatar: avatarURL,});
    res.status(201).json({email: newUser.email, subscription: newUser.subscription});
};

module.exports = ControllerWrapper(register);