//criação de tabelas etc
import sql from './db-connect.js'

//campo date =  YYYY-MM-DD

sql`
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255), 
    text TEXT,
    author VARCHAR(100),
    date DATE,
    category VARCHAR(50),
    privacy VARCHAR(20)
);`.then(() => {
    console.log("Tabela criada");
})