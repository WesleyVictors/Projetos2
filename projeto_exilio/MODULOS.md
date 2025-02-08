# Módulos Utilizados no Projeto

Este projeto usa os seguintes módulos (pacotes) para facilitar o desenvolvimento e melhorar a produtividade:

## Dependências

1. **@fastify/formbody** (v8.0.2)
   - **Função**: Plugin do Fastify para analisar o corpo da solicitação como `application/x-www-form-urlencoded` e `multipart/form-data`.
   - **Instalação**: 
     ```bash
     npm install @fastify/formbody
     ```

2. **dotenv** (v16.4.7)
   - **Função**: Carrega variáveis de ambiente a partir de um arquivo `.env` para configuração do ambiente de desenvolvimento.
   - **Instalação**: 
     ```bash
     npm install dotenv
     ```

3. **fastify-formbody** (v5.3.0)
   - **Função**: Plugin do Fastify para análise de dados de formulário (como POST de `x-www-form-urlencoded`).
   - **Instalação**: 
     ```bash
     npm install fastify-formbody
     ```

4. **fastify** (v5.2.1)
   - **Função**: Framework web rápido e altamente extensível para Node.js, utilizado para criar APIs e servidores web.
   - **Instalação**: 
     ```bash
     npm install fastify
     ```

5. **pg** (v8.13.1)
   - **Função**: Cliente PostgreSQL para Node.js, usado para interagir com o banco de dados PostgreSQL.
   - **Instalação**: 
     ```bash
     npm install pg
     ```

6. **postgres** (v3.4.5)
   - **Função**: Módulo de cliente PostgreSQL leve e moderno, usado para se comunicar com o banco de dados PostgreSQL.
   - **Instalação**: 
     ```bash
     npm install postgres
     ```

## Como Instalar as Dependências

Se você clonar este repositório, basta rodar o seguinte comando para instalar todas as dependências do projeto:

```bash
npm install
