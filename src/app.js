
const express = require("express");
const cors = require("cors"); //Cors: outros dominios acessar a API
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes")
const videoRoutes = require("./routes/videoRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");


const app = express();

app.use(cookieParser())
app.use(cors());
app.use(express.json()); //permite JSON no body
app.use(express.static(path.join(__dirname, "public"))); //Abrir arquivos estáticos da pasta public

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Subscriptions rodando" });
});

module.exports = app;
