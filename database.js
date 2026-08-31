const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'inventario.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

db.serialize(() => {
    // Tabela de Usuários
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        usuario TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
    )`);

    // Tabela de Equipamentos
    db.run(`CREATE TABLE IF NOT EXISTS equipamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patrimonio TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        tipo TEXT NOT NULL,
        modelo TEXT NOT NULL,
        piso TEXT NOT NULL,
        sala TEXT NOT NULL,
        coord_lat REAL NOT NULL,
        coord_lng REAL NOT NULL
    )`);

    // Criar usuário padrão (admin / admin123)
    db.get("SELECT * FROM usuarios WHERE usuario = ?", ['admin'], (err, row) => {
        if (!row) {
            const hash = bcrypt.hashSync('admin123', 10);
            db.run("INSERT INTO usuarios (nome, usuario, senha) VALUES (?, ?, ?)", ['Administrador', 'admin', hash]);
            console.log('Usuário padrão criado: admin / admin123');
        }
    });
});

module.exports = db;