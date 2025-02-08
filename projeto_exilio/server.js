import { fastify } from 'fastify'
import pkg from '@fastify/formbody'
import { sql } from './sql.js'


const server = fastify()


const { fastifyFormbody } = pkg;

server.register(fastifyFormbody); //plugin de processamento




// Rota para adicionar um novo usuário
server.post('/usuarios', async (request, reply) => {
    const { nome, email, telefone } = request.body;
  
    try {
      // Inserir os dados diretamente no banco de dados PostgreSQL
      await sql`
        INSERT INTO usuarios (nome, email, telefone) 
        VALUES (${nome}, ${email}, ${telefone})
      `;
  
      return reply.redirect("./page/index.html");
      // Retornar sucesso
      //reply.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
  
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      // Retornar erro se ocorrer
      reply.status(500).send({ error: 'Erro ao cadastrar usuário', details: error.message });
    }
  });




/*            !!! As rotas a seguir ainda não foram concluídas, porém sera adicionado a função de editar e alterar os dados do cliente,
                  para isso, precisamos criar uma pagina apenas para essa finalidade !!!

*/

// .post enviar    CRUD
  //console.log(database.list())



  //return reply.status(201).send()// retorna o status de erro ou sucesso  201 significa que algo foi criado 





 // .get buscar informaçoes   
//server.get('/usuarios', () => {    //quando acessador o localhost333,(rota raíz) será executado essa função
    //const usuarios = database.list()

   // return usuarios
// .put alterar

//}) 



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
  port: process.env.PORT || 3333, // Usa a porta do Vercel ou 3333 como fallback
  host: '0.0.0.0', // Permite acesso externo
})



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
