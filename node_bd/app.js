const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'teste'
});

conexao.connect(function (erro) {
    if (erro) throw erro;
});

app.get('/', function (req, res) {
    res.render('login');
});

app.post('/logar', function (req, res) {
    const { login, senha } = req.body;

    conexao.query("SELECT * FROM usuarios WHERE login = ? AND senha = ?", [login, senha], function (err, result) {
        if (err) throw err;

        if (result.length > 0) {
            conexao.query("SELECT * FROM materiais", function (err, materiais) {
                if (err) throw err;
                res.render('materiais', { materiais });
            });
        } else {
            res.send("Login inválido");
        }
    });
});

app.get('/materiais', function (req, res) {
    conexao.query("SELECT * FROM materiais", function (err, materiais) {
        if (err) throw err;
        res.render('materiais', { materiais });
    });
});

app.get('/deletar/:id', function (req, res) {
    const id = req.params.id;

    conexao.query("DELETE FROM materiais WHERE id = ?", [id], function (err) {
        if (err) throw err;
        res.redirect('/materiais');
    });
});

app.get('/editar/:id', function (req, res) {
    const id = req.params.id;

    conexao.query("SELECT * FROM materiais WHERE id = ?", [id], function (err, resultado) {
        if (err) throw err;
        res.render('editar', { material: resultado[0] });
    });
});

app.post('/atualizar/:id', function (req, res) {
    const id = req.params.id;
    const { nome, descricao } = req.body;

    conexao.query("UPDATE materiais SET nome = ?, descricao = ? WHERE id = ?", [nome, descricao, id], function (err) {
        if (err) throw err;
        res.redirect('/materiais');
    });
});

app.listen(8090);