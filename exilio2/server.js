
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Configurar o middleware para processamento dos dados
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'USER',  
  password: '86683684',  
  database: 'clientes' 
});

// Conectando ao bd
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});

// Rota do html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para processamento dos dados 
app.post('/processar', (req, res) => {
  const { nome, email } = req.body;

  // insere valores na tabela
  const query = 'INSERT INTO clientes (nome, email) VALUES (?, ?)';
  db.query(query, [nome, email], (err, result) => {
    if (err) {
      res.send('Erro ao cadastrar cliente: ' + err.message);
    } else {
      res.send('Cadastro realizado com sucesso!');
    }
  });
});

// Iniciar o servidor
const PORT = 3306;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});




// enviar o formulário via AJAX
function enviarFormulario(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const dados = new FormData();
    dados.append('nome', nome);
    dados.append('email', email);

    // Envia os dados para o servidor via AJAX
    fetch('/processar', {
        method: 'POST',
        body: dados
    })
    .then(response => response.text())
    .then(data => {
        // Exibe a mensagem de sucesso ou erro
        mostrarMensagem(data);
    })
    .catch(error => {
        // Caso haja um erro, exibe a mensagem de erro
        mostrarMensagem('Erro ao enviar os dados. Tente novamente!', true);
    });
}

//  mensagem de sucesso/erro
function mostrarMensagem(mensagem, erro = false) {
    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.textContent = mensagem;
    mensagemDiv.classList.remove('sucesso', 'erro');
    mensagemDiv.classList.add(erro ? 'erro' : 'sucesso');
    mensagemDiv.style.display = 'block';

    // Define tempo da mensagem
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 5000);
}
  