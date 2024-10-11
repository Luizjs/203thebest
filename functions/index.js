const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados SQLite
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Erro ao abrir banco de dados:', err);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            number INTEGER,
            size TEXT,
            type TEXT,
            payment TEXT
        )`);
    }
});

// Rota para receber pedidos
app.post('/api/order', (req, res) => {
    const { name, number, size, type, payment } = req.body;

    if (!name || !number || !size || !type || !payment) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }

    db.run('INSERT INTO orders (name, number, size, type, payment) VALUES (?, ?, ?, ?, ?)', 
    [name, number, size, type, payment], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
        }
        res.status(200).json({ success: 'Pedido registrado com sucesso!' });
    });
});

// Rota para login de admin
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ error: 'Usuário ou senha incorretos' });
    }
});

// Rota para obter pedidos (apenas para admin)
app.get('/api/admin/orders', (req, res) => {
    db.all('SELECT * FROM orders', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar pedidos' });
        }
        res.json(rows);
    });
});

// Exportar a função do Firebase Functions
exports.api = functions.https.onRequest(app);
