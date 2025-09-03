const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// conecta banco e inicia servidor
connectDB();

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
