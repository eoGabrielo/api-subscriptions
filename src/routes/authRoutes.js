const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const authController = require("../controllers/authController.js");
const verifyToken = require("../middlewares/verifyToken.js");

//habilitar cookieParse
router.use(cookieParser());

//Rotas user
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refresh);
router.post("/logout", authController.logout);

//Rota protegida apra teste
router.get("/me", verifyToken, authController.me);

module.exports = router