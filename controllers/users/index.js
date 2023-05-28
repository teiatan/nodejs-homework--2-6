const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getUsersData = require("./getUsersData");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");


module.exports = {
    register,
    login,
    logout,
    getUsersData,
    updateSubscription,
    updateAvatar,
    verifyEmail
}