const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");
const modifyImage = require("./modifyImage");

module.exports = {
    validateBody,
    isValidId,
    authenticate,
    upload,
    modifyImage
};