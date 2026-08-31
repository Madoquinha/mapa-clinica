const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_super_segura_ti';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de Autenticação
function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });

    jwt.verify(token, SECRET_KEY, (err, usuario) => {
        if (err) return res.status(403).json({ erro: 'Token inválido ou expirado.' });
        req.usuario = usuario;
        next();
    });
}

// Rotas de Autenticação
app.post('/api/login', (req, res) => {
    const { usuario, senha } = req.body;

    db.get("SELECT * FROM usuarios WHERE usuario = ?", [usuario], (err, user) => {
        if (err) return res.status(500).json({ erro: 'Erro no servidor.' });
        if (!user) return res.status(400).json({ erro: 'Usuário ou senha inválidos.' });

        const senhaValida = bcrypt.compareSync(senha, user.senha);
        if (!senhaValida) return res.status(400).json({ erro: 'Usuário ou senha inválidos.' });

        const token = jwt.sign({ id: user.id, usuario: user.usuario, nome: user.nome }, SECRET_KEY, { expiresIn: '8h' });
        res.json({ token, nome: user.nome, usuario: user.usuario });
    });
});

// Rotas de Equipamentos
app.get('/api/equipamentos', autenticarToken, (req, res) => {
    db.all("SELECT * FROM equipamentos", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        
        const equipamentos = rows.map(r => ({
            patrimônio: r.patrimonio,
            nome: r.nome,
            tipo: r.tipo,
            modelo: r.modelo,
            piso: r.piso,
            sala: r.sala,
            coords: [r.coord_lat, r.coord_lng]
        }));
        res.json(equipamentos);
    });
});

app.post('/api/equipamentos', autenticarToken, (req, res) => {
    const { patrimônio, nome, tipo, modelo, piso, sala, coords } = req.body;

    const query = `INSERT INTO equipamentos (patrimonio, nome, tipo, modelo, piso, sala, coord_lat, coord_lng) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [patrimônio, nome, tipo, modelo, piso, sala, coords[0], coords[1]], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ erro: 'Já existe um equipamento com este patrimônio.' });
            }
            return res.status(500).json({ erro: err.message });
        }
        res.status(201).json({ mensagem: 'Equipamento adicionado com sucesso.' });
    });
});

app.put('/api/equipamentos/:patrimonio', autenticarToken, (req, res) => {
    const patrimonioOriginal = req.params.patrimonio;
    const { patrimônio, nome, tipo, modelo, piso, sala, coords } = req.body;

    let query, params;
    if (coords) {
        query = `UPDATE equipamentos SET patrimonio = ?, nome = ?, tipo = ?, modelo = ?, piso = ?, sala = ?, coord_lat = ?, coord_lng = ? WHERE patrimonio = ?`;
        params = [patrimônio, nome, tipo, modelo, piso, sala, coords[0], coords[1], patrimonioOriginal];
    } else {
        query = `UPDATE equipamentos SET patrimonio = ?, nome = ?, tipo = ?, modelo = ?, piso = ?, sala = ? WHERE patrimonio = ?`;
        params = [patrimônio, nome, tipo, modelo, piso, sala, patrimonioOriginal];
    }

    db.run(query, params, function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: 'Equipamento atualizado com sucesso.' });
    });
});

app.delete('/api/equipamentos/:patrimonio', autenticarToken, (req, res) => {
    db.run("DELETE FROM equipamentos WHERE patrimonio = ?", [req.params.patrimonio], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ mensagem: 'Equipamento removido com sucesso.' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});