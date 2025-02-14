import { fastify } from 'fastify';
import pkg from '@fastify/formbody';
import { sql, initDB } from './sql.js'; // Importando a função sql e initDB

const server = fastify();

const { fastifyFormbody } = pkg;
server.register(fastifyFormbody); // Plugin de processamento de formulário

// Inicializa a conexão com o banco de dados PostgreSQL
initDB().catch((err) => {
  console.error('Erro ao conectar ao banco de dados:', err);
  process.exit(1);
});

// Rota para adicionar um novo usuário
server.post('/usuarios', async (request, reply) => {
  const { nome, email, telefone } = request.body;

  try {
    // Inserir os dados diretamente no banco de dados PostgreSQL
    await sql`
      INSERT INTO usuarios (nome, email, telefone) 
      VALUES (${nome}, ${email}, ${telefone})
    `;

    return reply.type('text/html').send(`
      <html>
        <head>
          <title>Cadastro realizado com sucesso</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f7fc; font-family: Arial, sans-serif; }
            .container { text-align: center; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .success-message { font-size: 36px; font-weight: bold; color: #0A2126; margin-bottom: 20px; }
            .container button { font-size: 18px; background-color: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s; }
            .container button:hover { background-color: #218838; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-message">Cadastro realizado com sucesso!</div>
            <div class="success-message">Entraremos em contato em breve para te atender.</div>
            <script>
              setTimeout(() => { window.location.href = "http://127.0.0.1:5500/page/index.html"; }, 3000);
            </script>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    reply.status(500).send({ error: 'Erro ao cadastrar usuário', details: error.message });
  }
});

// Rota para listar todos os usuários
server.get('/usuarios', async (request, reply) => {
  try {
    const res = await sql`SELECT * FROM usuarios`;
    return res.rows;  // Retorna a lista de usuários
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return reply.status(500).send({ error: 'Erro ao listar usuários', details: error.message });
  }
});

// Rota para atualizar um usuário
server.put('/usuarios/:id', async (request, reply) => {
  const usuarioID = request.params.id;
  const { nome, email, telefone } = request.body;

  try {
    await sql`
      UPDATE usuarios 
      SET nome = ${nome}, email = ${email}, telefone = ${telefone} 
      WHERE id = ${usuarioID}
    `;

    return reply.status(204).send(); // 204 indica sucesso sem conteúdo de resposta
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return reply.status(500).send({ error: 'Erro ao atualizar usuário', details: error.message });
  }
});

// Rota para excluir um usuário
server.delete('/usuarios/:id', async (request, reply) => {
  const usuarioID = request.params.id;

  try {
    await sql`DELETE FROM usuarios WHERE id = ${usuarioID}`;
    return reply.status(204).send(); // 204 indica sucesso sem conteúdo de resposta
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return reply.status(500).send({ error: 'Erro ao excluir usuário', details: error.message });
  }
});

// Inicia o servidor Fastify
server.listen({
  port: process.env.PORT ?? 3333
}).then(() => {
  console.log('Servidor iniciado');
});
