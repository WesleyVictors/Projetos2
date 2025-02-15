import 'dotenv/config'   
import postgres from 'postgres'


const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432, // Porta do PostgreSQL
  ssl: {
    rejectUnauthorized: false,
   }, // Para garantir que o cliente aceite certificados não verificados
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

