//Regra de negocios para as rotas.

const User = require("../models/User");
const { signAccessToken, signRefreshToken } = require("../utils/jwt");

// Helper para setar cookie httpOnly do refresh token
function setRefreshCookie(res, refreshToken) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    path: "/api/auth", // restringe onde o cookie é enviado
  });
}

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409).json({ message: "E-mail já cadastrado" });
    };

    const user = await User.create({ nome, email, senha });

    //Payload do user
    const payload = { id: user._id.toString(), nome: user.nome, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: payload.id, role: payload.role });

    setRefreshCookie(res, refreshToken);

    return res.json({
      message: "Login realizado com sucesso!",
      accessToken,
      user: { id: user._id, nome: user.nome, email: user.email, role: user.role }
    });

  } catch (err) {
    return res.status(500).json({ message: "Erro ao registrar usuario", error: err.message });
  }
}

exports.refresh = async (req, res) => {
  try {

  } catch (err) {

  }
}
