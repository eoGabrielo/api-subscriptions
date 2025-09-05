const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");

//Rota up plan
router.post("/upgrade-plan", verifyToken, async(req, res) => {
    try{
        const userId = req.user.id;

        //Duração da assinatura
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        //Atualizar plano do user
        const user = await User.findByIdAndUpdate(userId,
            {
                plan: "premium",
                planExpiresAt: expirationDate
            },
            {
                new: true
            }
        );

        return res.json({
            message: "Plano atualizado para PREMIUM com sucesso!",
            user: {
                id: user._id,
                nome: user.nome,
                email: user.email,
                plan: user.plan,
                planExpiresAt: user.planExpiresAt
            }
        });

    }catch(err){

        return res.status(500).json({ message: "Erro ao atualizar plano", error: err.message });

    }
})

module.exports = router;
