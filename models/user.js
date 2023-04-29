const {Schema, model} = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegex,
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().pattern(emailRegex).required(),
}, {
    versionKey: false,
    timestamps: true,
});

const loginSchema = Joi.object({
    password: Joi.string().min(8).required(),
    email: Joi.string().pattern(emailRegex).required(),
}, {
    versionKey: false,
    timestamps: true,
});


const User = model("user", userSchema);
const schemas = {
    registerSchema,
    loginSchema
};

module.exports = {
    User,
    schemas
};