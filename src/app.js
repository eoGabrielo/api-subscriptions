
const express = require("express");
const cors = require("cors"); //Cors: outros dominios acessar a API
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes")
const cookieParser = require("cookie-parser");


const app = express();

app.use(cookieParser())
app.use(cors());
app.use(express.json()); //permite JSON no body

app.use("/api/auth", authRoutes)
app.use("/api", adminRoutes)

app.get("/", (req, res) => {
  res.json({ message: "API Subscriptions rodando" });
});

module.exports = app;
