import { sql } from './sql.js';

sql`
    CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(15)
);
`.then (() => {
    console.log('tabela criada')
})

// Criação da tabela no neon console.