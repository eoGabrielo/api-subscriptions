const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const verifyRole = require("../middlewares/verifyRole");

// Exemplo de rota restrita para ADMIN
router.get("/admin/dashboard", verifyToken, verifyRole("admin"), (req, res) => {
  res.json({ message: `Bem-vindo ao painel admin, ${req.user.nome}` });
});

module.exports = router;
