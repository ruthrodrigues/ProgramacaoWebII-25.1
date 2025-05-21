const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'aula'
});

conexao.connect(function (erro) {
    if (erro) throw erro;
    console.log("Conectado ao MySQL!");
});

app.get('/', function (req, res) {
    res.render('formulario');
});

app.get('/listar', function (req, res) {
    const sql = 'SELECT * FROM atvAuth';
    conexao.query(sql, function (erro, retorno) {
        if (erro) throw erro;
        res.render('formulario', { listagem: retorno });
    });
});

app.post('/listar', function (req, res) {
    const acesslevel = req.body.acessLevel;
    const email = req.body.email;
    const password = req.body.senha;

    const sql = "INSERT INTO atvAuth (email, password, acessLevel) VALUES (?, ?, ?)";
    conexao.query(sql, [email, password, acesslevel], function (err, result) {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.render('formulario', {
                mensagem: 'Erro ao cadastrar usuário.'
            });
        }

        res.render('formulario', {
            mensagem: 'Usuário cadastrado com sucesso!'
        });
    });
});

app.post('/login', function (req, res) {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM atvAuth WHERE email = ? AND password = ?";
    conexao.query(sql, [email, senha], function (err, results) {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.render('formulario', { mensagem: 'Erro ao fazer login.' });
        }

        if (results.length === 0) {
            return res.render('formulario', { mensagem: 'Usuário ou senha inválidos.' });
        }

        const user = results[0];
        const isAdmin = user.acessLevel === 'admin';

        res.render('formulario', {
            mensagem: isAdmin
                ? 'Bem-vindo, administrador!'
                : 'Bem-vindo, usuário comum.'
        });
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});