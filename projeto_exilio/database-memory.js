import {randomUUID } from "node:crypto" 
//responsável por criar um id unico para cada usuário
// https://www.youtube.com/watch?v=hHM-hr9q4mo   minuto 28:00
//esse arquivo é um banco de dados temporário para edição 


export  class DatabaseMemory {    
    #usuarios = new Map()

    list() {
        return Array.from(this.#usuarios.entries()).map((array) => {       // .entries facilita na busca dos arrays 
            const id = array[0]  //determina que o id está na primeira posição
            const data = array[1]  // e as demais informações na segunda

            return  {
                id,
                ...data,
            }
        })//retorna os usuarios array.from usado para retornar  o array
    }
    create(usuario) {  //criação de usuario no banco usuarios 
        const usuarioID = randomUUID()   //cria um id para usuario
        this.#usuarios.set(usuarioID, usuario)
    }

    update(usuario) {  //criação de usuario no banco usuarios 
        this.#usuarios.set(id, usuario)
    }
    delete(id) {
        this.#usuarios.delete(id)
    }
}