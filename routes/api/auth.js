const express = require("express");
const {validateBody} = require("../../middlewares");
const {schemas} = require("../../models/user");
const {register, login, logout} = require("../../controllers/auth");

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), register);
router.post('/login', validateBody(schemas.loginSchema), login);
router.post('/logout', validateBody(schemas.loginSchema), logout);

module.exports = router;