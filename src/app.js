
const express = require("express");
const cors = require("cors"); //Cors: outros dominios acessar a API
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json()); //permite JSON no body

app.get("/", (req, res) => {
  res.json({ message: "API Subscriptions rodando" });
});

module.exports = app;
