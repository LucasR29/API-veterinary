# 🏆 Projeto Backend

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Documentação](#4-documentação)

---

---

## Api-veterinary

Esta Api tem como objetivo ajudar clínicas veterinária a ter um controle de registros médicos, agendamento de consultas, procedimentos, tratamentos e medicamentos dos pets. Ainda possibilita que o dono do pet agende consultas e tenha um registro completo de seu pet com controle de vacinas.

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [ts-jest](https://jestjs.io/pt-BR/docs/expect)
- [supertest](https://github.com/ladjs/supertest)

A URL base da aplicação:
(colocar link da Api)

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

- [DER](https://dbdiagram.io/d/63bc5cd46afaa541e5d152e9)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Documentação

[ Voltar para o topo ](#tabela-de-conteúdos)

Documentação com todos Endpoints:

- [APIveterinary](https://api-veterinary.github.io/back-end-project/)

---
