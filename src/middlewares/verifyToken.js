//Valida token

const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Acesso negado: token ausente ou errado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Colocamos dados úteis no req.user (id, role, email, nome)
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
};


