import 'dotenv/config'   //le  as variáveis ambient do .env e salva na variável global do node process.env
import postgres from 'postgres'


const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  //port: 5432,
  //ssl: 'require',
  port: 5432, // Porto do PostgreSQL
  ssl: {
    rejectUnauthorized: false,
   }, // Para garantir que o cliente aceite certificados não verificados
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados MySQL!');
});

