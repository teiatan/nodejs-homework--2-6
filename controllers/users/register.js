const {User} = require("../../models/user");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");


const {ControllerWrapper, HttpError} = require("../../utils/index");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const register = async (req, res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, `User with email ${email} already exists`);
    };

    // const avatarExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff"];
    let avatarURL;
    if(req.file){
        const { path: tempUpload, originalname} = req.file;
        const resultUpload = path.join(avatarDir, originalname);
        await fs.rename(tempUpload, resultUpload);
        avatarURL = path.join("avatars", originalname);
    } else {
        avatarURL = gravatar.url(email, { s: "100", r: "x" }, false);
    };

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    res.status(201).json({email: newUser.email, subscription: newUser.subscription});
};

module.exports = ControllerWrapper(register);