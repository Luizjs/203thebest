require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const orderRoutes = require('./routes/orderRoutes');

// Conectando ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de pedidos
app.use('/api/order', orderRoutes);

// Servidor escutando
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
