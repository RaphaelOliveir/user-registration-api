const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Users = require("../model/user");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
};

router.get("/", async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao consultar usuários" });
  }
});

router.post("/create", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Dados insuficientes!" });
  }

  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ error: "Usuário já registrado!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({ email, password: hashedPassword });
    return res.status(201).send({ newUser, token: createUserToken(newUser.id) });
  } catch (err) {
    return res.status(500).send({ error: "Erro ao criar usuário" });
  }
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Dados insuficientes!" });
  }

  try {
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).send({ error: "Usuário não registrado!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Erro ao autenticar usuário!" });
    }

    user.password = undefined;
    return res.send({ user, token: createUserToken(user.id) });
  } catch (err) {
    return res.status(500).send({ error: "Erro ao autenticar usuário!" });
  }
});

module.exports = router;
