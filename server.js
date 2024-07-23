const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM administradores WHERE username = ? AND password = ?';

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados');
      return;
    }

    if (results.length > 0) {
      res.send({ success: true, message: 'Login realizado com sucesso!' });
    } else {
      res.send({ success: false, message: 'Usuário ou senha incorretos!' });
    }
  });
});
app.post('/cadastro', (req, res) => {
  const { username, email, cpf, telefone } = req.body;
  const query = 'INSERT INTO tabela (username, email, cpf, telefone) VALUES (?, ?, ?, ?)';
  connection.query(query, [username, email, cpf, telefone], (error, results) => {
    if (error) {
      console.error('Erro ao inserir dados:', error);
      res.status(500).json({ success: false, message: 'Erro ao inserir dados' });
    } else {
      res.json({ success: true, message: 'Cadastro realizado com sucesso!' });
    }
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
