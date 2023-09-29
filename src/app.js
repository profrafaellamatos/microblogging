const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'microblogging_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Rota para a página principal
app.route('/')
  .get((req, res) => {
    const query = 'SELECT * FROM postagens ORDER BY id DESC LIMIT 1';

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao obter postagens:', err);
        res.status(500).send('Erro interno do servidor');
      } else {
        const postagem = results[0];
        res.send(`<h1>Última Postagem:</h1><p>${postagem ? postagem.mensagem : 'Nenhuma postagem ainda.'}</p>`);
      }
    });
  })
  .post((req, res) => {
    const { mensagem } = req.body;
    const query = 'INSERT INTO postagens (mensagem) VALUES (?)';

    connection.query(query, [mensagem], (err) => {
      if (err) {
        console.error('Erro ao adicionar postagem:', err);
        res.status(500).send('Erro interno do servidor');
      } else {
        res.redirect('/');
      }
    });
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
