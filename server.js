const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// PRIMEIRO: Criar o app
const app = express();

// DEPOIS: Definir origens permitidas
const allowedOrigins = [
  'http://localhost:4200',
  'https://seu-frontend-url.vercel.app' // Será preenchido depois
];

// Middleware CORS configurado
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware para JSON
app.use(express.json());

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB conectado'))
.catch(err => console.log('❌ Erro ao conectar MongoDB:', err));

// Importar rotas
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

// Usar rotas
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Rota teste
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ Backend está rodando!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});