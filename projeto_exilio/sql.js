// sql.js
import { Client } from 'pg';

// Criando uma instância do cliente do PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL, // A URL de conexão do banco de dados
  ssl: {
    rejectUnauthorized: false,  // Necessário para conectar via SSL ao banco de dados na Neon
  }
});

// Função para inicializar a conexão
const initDB = async () => {
  await client.connect();
};

// Função para realizar consultas SQL
const sql = async (query, values = []) => {
  try {
    const res = await client.query(query, values);
    return res;
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    throw error;
  }
};

export { initDB, sql };
