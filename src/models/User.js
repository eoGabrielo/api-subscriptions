const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, minlength: 6, select: false },
    role: { 
      type: String,
      enum: ["user", "admin"],
      default: "user" 
    },
  },
  { timestamps: true }
);

// Middle: Criptografar senha antes de salvar se for nova ou modificada
userSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

//Função: para comparar senha digitada com a do banco de dados.
userSchema.methods.comparePassword = function (senhaDigitada, senhaBanco) {
  return bcrypt.compare(senhaDigitada, senhaBanco);
};

module.exports = mongoose.model("User", userSchema);
