const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Criar novo pedido
router.post('/', async (req, res) => {
    const { name, number, size, type, payment } = req.body;

    if (!name || !number || !size || !type || !payment) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }

    try {
        const newOrder = new Order({ name, number, size, type, payment });
        await newOrder.save();
        res.status(201).json({ success: 'Pedido registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar o pedido' });
    }
});

// Buscar todos os pedidos
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
});

module.exports = router;
