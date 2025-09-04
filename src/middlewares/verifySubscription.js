
//Valida plano e expiração do plano/assinatura
function verifySubscription(req, res, next) {
    try {
        const user = req.user;

        if (user.plan !== "premium") {
            return res.status(403).json({ message: "Acesso negado: apenas usuários premium", user: user });
        }

        if (user.planExpiresAt && new Date(user.planExpiresAt) < new Date()) {
            return res.status(403).json({
                message: "Assinatura expirada, renove para continuar.",
                subscriptionStatus: "Assinatura expirada"
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({ message: "Erro ao verificar assinatura", error: err.message });
    }

}

module.exports = verifySubscription;