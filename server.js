const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const twilio = require('twilio');

const app = express();

app.use(cors());
app.use(bodyParser.json());

/*const accountSid = 'SEU_ACCOUNT_SID'; // Substitua com seu Account SID
const authToken = 'SEU_AUTH_TOKEN'; // Substitua com seu Auth Token
const client = new twilio(accountSid, authToken);*/

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

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
  client.messages
    .create({
      body: `Olá, o cadastro de ${username} foi realizado com sucesso!`,
      from: 'whatsapp:+14155238886', // Esse é o número padrão do Twilio WhatsApp Sandbox
      to: `whatsapp:+21991944621` // Enviar para o número de telefone do jogador
    })
    .then(message => {
      console.log(`Mensagem enviada com sucesso: ${message.sid}`);
      res.json({ success: true });
    })
    .catch(error => {
      console.error('Erro ao enviar a mensagem:', error);
      res.json({ success: false, error: 'Erro ao enviar mensagem do WhatsApp' });
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
app.put('/estoque/:nome', (req, res) => {
  const nome = req.params.nome;
  const { quantidade, valor } = req.body;

  if (quantidade === undefined && valor === undefined) {
    return res.status(400).send("Nenhum valor para atualizar fornecido");
  }

  let query = 'UPDATE estoque SET ';
  const values = [];
  
  if (quantidade !== undefined) {
    query += 'quantidade = ? ';
    values.push(quantidade);
  }
  
  if (valor !== undefined) {
    if (values.length > 0) {
      query += ', ';
    }
    query += 'valor = ? ';
    values.push(valor);
  }

  query += 'WHERE nome = ?';
  values.push(nome);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar estoque:', err);
      return res.status(500).send('Erro ao atualizar estoque');
    }

    res.send({ success: true, message: 'Estoque atualizado com sucesso' });
  });
});
app.post('/jogo', (req, res) => {
  const { nome, numero } = req.body;
  const query = 'INSERT INTO jogo (nome, numero) VALUES (?, ?)';

  db.query(query, [nome, numero], (err, result) => {
    if (err) {
      console.error('Erro ao inserir jogador:', err);
      return res.status(500).send('Erro ao inserir jogador');
    }
    res.status(201).send('Jogador adicionado com sucesso');
  });
});
app.get('/estoque/:nome', (req, res) => {
  const nomeItem = req.params.nome;
  const query = 'SELECT * FROM estoque WHERE nome = ?';

  db.query(query, [nomeItem], (err, results) => {
    if (err) {
      console.error('Erro ao buscar item no estoque:', err);
      return res.status(500).send({ error: 'Erro interno do servidor' });
    }

    if (results.length === 0) {
      return res.status(404).send({ error: 'Item não encontrado' });
    }

    res.send(results[0]);
  });
});
app.post('/pedidos', (req, res) => {
  const { nomeJogador, items, formaPagamento, valorTotal,  dataPedido  } = req.body;  // Recebendo o valor total

  const queryPedido = 'INSERT INTO pedidos (nome_jogador, forma_pagamento, valor_total, data_pedido) VALUES (?, ?, ?, ?)';  // Incluindo o valor total
  db.query(queryPedido, [nomeJogador, formaPagamento, valorTotal, dataPedido], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar pedido:', err);
      res.status(500).send('Erro no servidor');
    } else {
      const pedidoId = result.insertId;

      // Mapeando quantidade de itens
      const itemCountMap = items.reduce((acc, item) => {
        acc[item.nome] = (acc[item.nome] || 0) + 1;
        return acc;
      }, {});

      const queryItens = 'INSERT INTO itens_pedidos (pedido_id, nome_item, quantidade, valor) VALUES ?';
      const values = Object.keys(itemCountMap).map(nomeItem => [
        pedidoId, 
        nomeItem, 
        itemCountMap[nomeItem],  // Quantidade correta
        items.find(item => item.nome === nomeItem).valor  // Valor do item
      ]);

      db.query(queryItens, [values], (err, result) => {
        if (err) {
          console.error('Erro ao cadastrar itens do pedido:', err);
          res.status(500).send('Erro no servidor');
        } else {
          res.send('Pedido cadastrado com sucesso');
        }
      });
    }
  });
});


app.get('/estoque/bolinhas', (req, res) => {
  const query = 'SELECT quantidade FROM estoque WHERE nome = "bolinhas"';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Bolinhas não encontradas no estoque' });
    }
    res.json({ quantidade: result[0].quantidade });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
