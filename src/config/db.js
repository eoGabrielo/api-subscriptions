const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // conecta no MongoDB
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error.message);
    process.exit(1); // encerra conexão se der errado
  }
};

module.exports = connectDB;
