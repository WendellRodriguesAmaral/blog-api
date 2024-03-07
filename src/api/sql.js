//criação de tabelas etc
import {sql} from './db-connect.js'

//campo date =  YYYY-MM-DD

// sql`
// CREATE TABLE IF NOT EXISTS posts (
//     id TEXT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     image VARCHAR(255), 
//     text TEXT,
//     author VARCHAR(100),
//     date DATE,
//     category VARCHAR(50),
//     privacy VARCHAR(20)
// );`.then(() => {
//     console.log("Tabela criada");
// })


// sql`
// CREATE TABLE IF NOT EXISTS users (
//     id TEXT PRIMARY KEY,
//     full_name VARCHAR(255) NOT NULL,
//     nickname VARCHAR(100) NOT NULL,
//     profile_picture VARCHAR(255),
//     short_phrase VARCHAR(255),
//     biography TEXT,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     secondary_email VARCHAR(100),
//     phone_number VARCHAR(20),
//     password VARCHAR(255) NOT NULL,
//     date_of_birth DATE,
//     gender CHAR(1),
//     profession VARCHAR(100)
// );`.then(() => {
//     console.log("Tabela criada");
// })


// sql`
//     ALTER TABLE posts
//     ADD CONSTRAINT fk_user
//     FOREIGN KEY (author) 
//     REFERENCES users(id);
// `.then(() => {
//     console.log("Tabela alterada para fazer o campo authro referenciar o id do usuário.");
// })


