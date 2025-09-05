//Valida plano e tempo de assinatura e aplica downgrade.
const User = require("../models/User");

async function verifySubscription(req, res, next) {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (user.plan !== "premium") {
            return res.status(403).json({ message: "Acesso negado: apenas usuários premium" });
        }

        if (user.planExpiresAt && new Date(user.planExpiresAt) < new Date()) {
            // downgrade automático
            user.plan = "free";
            user.planExpiresAt = null;
            await user.save();

            return res.status(403).json({
                message: "Assinatura expirada, você foi movido para o plano gratuito.",
                subscriptionStatus: "downgraded"
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({ message: "Erro ao verificar assinatura", error: err.message });
    }

}

module.exports = verifySubscription;