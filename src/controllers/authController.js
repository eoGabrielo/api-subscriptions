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
      return res.status(409).json({ message: "E-mail já cadastrado" });
    };

    const user = await User.create({ nome, email, senha });

    //Payload do user
    const payload = { id: user._id.toString(), nome: user.nome, email: user.email, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: payload.id, role: payload.role });

    setRefreshCookie(res, refreshToken);//Salvar token no cookie

    return res.status(201).json({
      message: "Usuário registrado com sucesso",
      accessToken,
      user: { id: user._id, nome: user.nome, email: user.email, role: user.role },
    });

  } catch (err) {
    return res.status(500).json({ message: "Erro ao registrar usuario", error: err.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email }).select("+senha");//".select("+senha") tras a senha junto. (No model isso ta bloqueado)"
    if (!user) {
      return res.statu(400).json({ message: "Credenciais invalidas!" });
    }

    const isMatch = await user.comparePassword(senha, user.senha);//Função exportada do model/User.js, compara senhas.
    if (!isMatch) {
      return res.statu(400).json({ message: "Credenciais invalidas!" });
    }

    const payload = { id: user._id.toString(), email: user.email, nome: user.nome, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: payload.id, role: payload.role });

    setRefreshCookie(res, refreshToken);

    return res.json({message: "Login realizado com sucesso",
      accessToken,
      user: { id: user._id, nome: user.nome, email: user.email, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao fazer login", error: err.message });
  }

}

exports.refresh = async(req, res) =>{
  try{
    const tokenFromCookie = req.cookie?.refreshToken;
    if(!tokenFromCookie){
      return res.status(401).json({message: "Refresh token ausente"});
    }

    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(tokenFromCookie, process.env.REFRESH_SECRET);

    //Gerar novo Accesse/Refresh token com o payload id e role
    const accessToken = signAccessToken({id: decoded.id, role: decoded.role});//Token headers
    const newRefresh = signRefreshToken({id: decoded.id, role: decoded.role});//Token cookie
    setRefreshCookie(res, newRefresh);//Renovar/Criar Token no cookie

    return res.json({accessToken});

  }catch(err){
    return res.statu(401).json({message: "Refresh token invalido ou expirado"});
  }

}

exports.me = async (req, res) => {
  //req.user vem do controller authController da função verifyToken
  return res.json({user: req.user})
}

exports.logout = async(req, res) =>{
  //Limpar cookie do RefreshToken
  res.clearCookie("regfreshToken", {path: "api/auth"});
  res.json({message: "Logout realizado!"});
}



