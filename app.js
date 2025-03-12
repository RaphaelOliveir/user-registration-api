const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const url = config.db_string;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(url, options);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o BD: ', + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do BD');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao BD!');
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRouter = require('./Routes/index');
const usersRouter = require('./Routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

const PORT = 3002;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = app;