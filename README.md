# 📌 API de Cadastro de Usuários

Uma API RESTful para gerenciamento de usuários, construída com Node.js, Express e MongoDB.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- JWT para autenticação
- bcrypt para hash de senhas

### 🔹 Rotas Disponíveis

#### 📝 Criar um Usuário
- **Endpoint:** `POST /users/create`
- **Descrição:** Cria um novo usuário.

#### 📜 Listar Usuários (Requer Autenticação)
- **Endpoint:** `GET /users/`
- **Descrição:** Retorna a lista de usuários cadastrados.

