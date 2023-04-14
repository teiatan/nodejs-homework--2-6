const { string } = require("joi");
const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    }, 
    dateOfBirth: {
        type: String,
        match: /(0?[1-9]|[12][0-9]|3[01])[- _](January|February|March|Aprel|May|June|July|August|September|October|November|December)[- _]((19|20)\d\d)/,
    },
    relationship: {
        type: String,
        enum: ["famile", "work", "friend", "service"],
    }
}, {
    versionKey: false,
    timestamps: true,
});

const Contact = model("contact", contactSchema);

module.exports = Contact;