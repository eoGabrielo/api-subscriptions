
# 📺 API de Assinaturas com JWT (Node.js + Express + MongoDB)

Este projeto foi desenvolvido com o objetivo de **utilizar autenticação JWT**, controle de **assinaturas premium com tempo de expiração** e **gestão de usuários com roles (user/admin)**.
A ideia é simular um sistema parecido com Netflix/Spotify, onde há conteúdos gratuitos e conteúdos premium disponíveis apenas para assinantes ativos.

No futuro, será adicionada a **integração com o Stripe** para pagamentos reais.

---

## 🚀 Tecnologias Utilizadas

* **Node.js** (runtime JavaScript no backend)
* **Express** (framework minimalista para criação de APIs)
* **MongoDB + Mongoose** (banco de dados NoSQL e ODM para modelagem dos dados)
* **JWT (JSON Web Token)** para autenticação e autorização
* **bcryptjs** para hashing seguro de senhas
* **cookie-parser** para manipulação de cookies HttpOnly (refresh token)

---

## 🔑 Funcionalidades

* Registro e login de usuários com senha criptografada
* Autenticação via **JWT Access Token + Refresh Token**
* Rotas protegidas por autenticação
* **Roles** (usuário comum e admin) com middleware de autorização
* Controle de plano de assinatura:

  * `free` → acesso limitado
  * `premium` → acesso total
* Verificação automática de expiração da assinatura (`planExpiresAt`)
* Middleware `verifySubscription` para bloquear acesso se o plano for inválido ou expirado
* Exemplo de **downgrade automático para free** quando o plano vence
* HTML básico com **formulário de login** e **página de perfil (me.html)** para demonstrar a API sem precisar de Swagger/Postman

---

## 📂 Estrutura do Projeto

```
api-subscriptions/
│
├── src/
│   ├── config/        # Configurações (ex: conexão MongoDB)
│   ├── middlewares/   # Middlewares (verifyRole, verifySubscription, verifyToken)
│   ├── models/        # Modelos Mongoose (User)
│   ├── routes/        # Rotas (adminRoutes, authRoutes, upgrade-plan, videoRoutes)
│   ├── utils/         # JWT
│   ├── public/         # Arquivos HTML e CSS simples para testar no navegador
│   ├── app.js         # Configuração principal do Express
│   └── server.js      # Ponto de entrada do servidor
│
├── .env               # Variáveis de ambiente
├── package.json       
```

---

## ⚙️ Como Rodar o Projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/api-subscriptions.git
   cd api-subscriptions
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo **.env** na raiz do projeto:

   ```env
   PORT=5000
   DB_URI=mongodb+srv://usuario:senha@cluster/test (SEU BANCO MONGODB)
   JWT_SECRET=seuSegredoAqui
   REFRESH_SECRET=outroSegredoAqui
   JWT_EXPIRES=15m
   REFRESH_EXPIRES=7d
   ```

4. Rode o servidor:

   ```bash
   npm run dev
   ```

## 📄 Páginas HTML disponíveis

Este projeto também conta com um **frontend básico em HTML + CSS simples**, apenas para facilitar a demonstração das rotas da API em entrevistas e testes locais.

### 🔗 Acesse no navegador:

- [Registro] 
  Formulário para criar uma nova conta.  
  - Campos: **nome, e-mail e senha**  
  - Envia requisição `POST /api/auth/register`  
  - Exibe mensagem de sucesso ou erro  

- [Login]
  Formulário de autenticação.  
  - Campos: **e-mail e senha**  
  - Envia requisição `POST /api/auth/login`  
  - Se sucesso → salva o **access token** no `localStorage` e o **refresh token** no cookie HttpOnly  

- [Perfil] 
  Página de perfil do usuário autenticado.  
  - Mostra os dados retornados de `GET /api/auth/me` (**nome, e-mail, role, plano e validade da assinatura**)  
  - Caso o token esteja inválido ou expirado → mostra aviso ao usuário  

- [Conteúdo Free]
  Exemplo de conteúdo gratuito (sem necessidade de autenticação ou plano).  
  - Usuários não logados conseguem acessar normalmente  
  - Serve como contraste ao conteúdo premium  

- [Conteúdo Premium]
  Conteúdo exclusivo para assinantes **premium**.  
  - Faz requisição para rota protegida por `verifySubscription`  
  - Usuários **free** ou com assinatura expirada → acesso negado  
  - Usuários **premium válidos** → acesso permitido  

- [Área Admin] 
  Página protegida apenas para administradores.  
  - Requisição para rota com `verifyRole("admin")`  
  - Usuários comuns → acesso negado  
  - Admins → conseguem acessar o painel de administração  

- [Logout] 
  Página para encerrar a sessão.  
  - Chama `POST /api/auth/logout`  
  - Remove o token do `localStorage` e o **refresh token** do cookie  
  - Redireciona automaticamente para a tela de login  


---

## 🔒 Fluxo de Autenticação

1. Usuário se registra (`/register`)
2. Faz login (`/login`) → recebe **access token** (salvo no localStorage) + **refresh token** (HttpOnly cookie)
3. Acessa rotas protegidas usando o **access token**
4. Logout limpa tokens (localStorage + cookies)

---

## 🏆 Próximos Passos

* [ ] Integrar com **Stripe** para pagamento real de planos premium
* [ ] Criar área de administração para gerenciar usuários e assinaturas

---

## ✨ Demonstração

* **Página de Login** → formulário para autenticar
* **Página Me (perfil)** → mostra dados do usuário logado e status da assinatura

*(As páginas HTML estão na pasta `public/` e utilizam apenas JavaScript puro + fetch API para se comunicar com a API.)*

---

## 📌 Observações

* O foco principal é **backend** (Node.js, Express, JWT, MongoDB).
* O frontend foi feito apenas para **demonstração simples** do fluxo.
