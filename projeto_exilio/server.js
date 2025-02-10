import { fastify } from 'fastify'
import pkg from '@fastify/formbody'
import { sql } from './sql.js'
import cors from 'fastify-cors'

//import { DatabaseMemory } from './database-memory.js'
//import { DatabasePostgres } from './database-postgres.js'




const server = fastify()


server.register(cors); 


const { fastifyFormbody } = pkg;

server.register(fastifyFormbody); //plugin de processamento


//const database = new DatabaseMemory()  //criando banco 

//const database = new DatabasePostgres() 

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
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #f4f7fc;
              font-family: Arial, sans-serif;
            }
            .container {
              text-align: center;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .success-message {
              font-size: 36px;
              font-weight: bold;
              color: #0A2126;
              margin-bottom: 20px;
            }
           
            .container button {
              font-size: 18px;
              background-color: #28a745;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s;
            }
            .container button:hover {
              background-color: #218838;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-message">
              Cadastro realizado com sucesso!
            </div>
            <div class="success-message">
              Entraremos em contato em breve para te atender
            </div>
            <script>
              setTimeout(() => {
                window.location.href = "http://127.0.0.1:5500/page/index.html";
              }, 3000); 
            </script>
          </div>
        </body>
      </html>
      `);
    

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      // Retornar erro se ocorrer
      reply.status(500).send({ error: 'Erro ao cadastrar usuário', details: error.message });
    }
  });
// .post enviar    CRUD
  //console.log(database.list())



  //return reply.status(201).send()// retorna o status de erro ou sucesso  201 significa que algo foi criado 





 // .get buscar informaçoes   
server.get('/usuarios', () => {    //quando acessador o localhost333,(rota raíz) será executado essa função
    const usuarios = database.list()

    return usuarios
// .put alterar

}) 



// .put alterar
server.put('/usuarios/:id', (request) => {    //quando acessador o localhost333,(rota raíz) será executado essa função
    const usuarioID = request.params.id       //solicita o id do video para alterar
    const { nome, email, telefone } = request.body

    database.update(usuarioID, {   //atualiza as informações 
        nome,
        email, 
        telefone,
    })


    return reply.status(204).send()  //204 significa que teve sucesso, porém não tem conteúdo
}) 


server.delete('/usuarios/:id', (request, reply) => {
    const usuarioID = request.params.id
    
    database.delete(usuarioID)

    
    return reply.status(204).send()
}) 



server.listen({
  port: process.env.PORT ?? 3333
})


module.exports = server.createHandler();


//instalar extesão dotenv serve para guardar as variais de ambiente



//import {createServer} from 'node:http'
//criação servidor com json  

//const server = createServer(() =>{   //os parametros dessa funçaõ serão de request ou response

//})
//server.addListen(3333) //porta usada 

//antes de rodar deve-se acionar o npm init -y para criar o pack .json  no pack adiconar (type: module)

//Para rodar, acione node server.js ou para acompanhar as mudanças em tempo real: node --watch server.js 

// para uso do http instalar estensão rest client 

//Para criação do servidor será usado o framework fastify npm install fastify
