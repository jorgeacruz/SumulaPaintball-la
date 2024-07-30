const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Conexão com o banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.post('/jogador', (req, res) => {
  const { username, email } = req.body;
  const query = 'SELECT * FROM jogadores WHERE username = ? AND email = ?';

  connection.query(query, [username, email], (err, results) => {
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
app.post('/addjogo', (req, res) => {
  const {data, hora } = req.body;
  const query = 'INSERT INTO jogos (data, hora) VALUES (?, ?)';

  connection.query(query, [data, hora], (err, results) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send({ success: false, message: 'Erro ao adicionar jogo' });
      return;
    }

    res.send({ success: true, message: 'Jogo adicionado com sucesso' });
  });
});

app.post('/cadastro', (req, res) => {
  const { username, email, cpf, telefone, senha } = req.body;
  const query = 'INSERT INTO jogadores (username, email, cpf, telefone, senha) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [username, email, cpf, telefone, senha], (error, results) => {
    if (error) {
      console.error('Erro ao inserir dados:', error);
      res.status(500).json({ success: false, message: 'Erro ao inserir dados' });
    } else {
      res.json({ success: true, message: 'Cadastro realizado com sucesso!' });
    }
  });
});
app.post('/verifyuser', (req, res) => {
  const { username, email } = req.body;
  const query = 'SELECT * FROM jogadores WHERE username = ? AND email = ?';
  
  connection.query(query, [username, email], (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Usuário ou email incorretos.' });
    }
  });
});

app.post('/resetpassword', async (req, res) => {
  const { username, email, newPassword } = req.body;

  if (!username || !email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = 'UPDATE jogadores SET senha = ? WHERE username = ? AND email = ?';
    const values = [hashedPassword, username, email];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Erro ao atualizar senha:', err);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
      }

      res.json({ success: true, message: 'Senha atualizada com sucesso.' });
    });
  } catch (error) {
    console.error('Erro na solicitação:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
});
app.post('/verifyadm', (req, res) => {
  const { username, email } = req.body;
  const query = 'SELECT * FROM administradores WHERE username = ? AND email = ?';
  
  connection.query(query, [username, email], (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Usuário ou email incorretos.' });
    }
  });
});

app.post('/resetpasswordadm', async (req, res) => {
  const { username, email, newPassword } = req.body;

  if (!username || !email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'UPDATE administradores SET password = ? WHERE username = ? AND email = ?';
    const values = [newPassword, username, email];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Erro ao atualizar senha:', err);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
      }

      res.json({ success: true, message: 'Senha atualizada com sucesso.' });
    });
  } catch (error) {
    console.error('Erro na solicitação:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
});
app.get('/estoque', (req, res) => {
  db.query('SELECT * FROM estoque', (err, results) => {
    if (err) {
      console.error('Erro ao buscar estoque:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Rota para adicionar um item ao estoque
app.post('/estoque', (req, res) => {
  const { item, valor, quantidade } = req.body;
  const query = 'INSERT INTO estoque (nome, valor, quantidade) VALUES (?, ?, ?)';
  db.query(query, [item, valor, quantidade], (err, results) => {
    if (err) {
      console.error('Erro ao adicionar item ao estoque:', err);
      return res.status(500).send(err);
    }
    res.json({ id: results.insertId, item, valor, quantidade });
  });
});

// Rota para remover um item do estoque
app.delete('/estoque/:nome', (req, res) => {
  const { nome } = req.params;
  const query = 'DELETE FROM estoque WHERE nome = ?';
  db.query(query, [nome], (err, results) => {
    if (err) {
      console.error('Erro ao remover item do estoque:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
