//import {randomUUID } from "node:crypto" 
import { sql } from './sql.js'

export  class DatabasePostgres {    
    

    
    async create(usuario) {  
        const { nome, email, telefone } = usuario;  
    
        await sql`INSERT INTO usuarios (nome, email, telefone) VALUES (${nome}, ${email}, ${telefone})`;
    }
}
  