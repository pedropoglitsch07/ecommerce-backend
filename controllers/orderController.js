const Order = require('../models/Order');

// Criar pedido (completo)
exports.createOrder = async (req, res) => {
  try {
    const { customer, address, items, subtotal, shipping, total } = req.body;

    // Validações básicas no backend (IMPORTANTE!)
    if (!customer || !customer.name || !customer.email) {
      return res.status(400).json({ error: 'Dados do cliente incompletos' });
    }

    if (!address || !address.street || !address.city || !address.zipCode) {
      return res.status(400).json({ error: 'Endereço incompleto' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Pedido sem itens' });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Total inválido' });
    }

    // Criar novo pedido
    const newOrder = new Order({
      customer,
      address,
      items,
      subtotal,
      shipping,
      total,
      status: 'pending',
    });

    // Salvar no BD
    await newOrder.save();

    // Retornar com sucesso
    res.status(201).json({
      message: 'Pedido criado com sucesso!',
      order: newOrder,
    });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

// Buscar um pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
};

// Listar todos os pedidos
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
};

// Atualizar status do pedido (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
};