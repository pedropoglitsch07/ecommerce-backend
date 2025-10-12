const { v4: uuidv4 } = require('uuid');

let carts = {};

exports.addToCart = (req, res) => {
  try {
    const { productId, productName, quantity, price } = req.body;
    const cartId = req.headers['cart-id'] || uuidv4();

    if (!carts[cartId]) {
      carts[cartId] = [];
    }

    const existingItem = carts[cartId].find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      carts[cartId].push({
        id: uuidv4(),
        productId,
        productName,
        quantity,
        price,
      });
    }

    res.json({
      message: 'Item adicionado ao carrinho',
      cartId,
      cart: carts[cartId],
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar ao carrinho' });
  }
};

exports.getCart = (req, res) => {
  try {
    const cartId = req.headers['cart-id'];
    if (!cartId || !carts[cartId]) {
      return res.json([]);
    }
    res.json(carts[cartId]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar carrinho' });
  }
};

exports.removeFromCart = (req, res) => {
  try {
    const cartId = req.headers['cart-id'];
    const itemId = req.params.itemId;

    if (!carts[cartId]) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }

    carts[cartId] = carts[cartId].filter(item => item.id !== itemId);
    res.json({ message: 'Item removido', cart: carts[cartId] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover do carrinho' });
  }
};

exports.updateCartItem = (req, res) => {
  try {
    const cartId = req.headers['cart-id'];
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    if (!carts[cartId]) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }

    const item = carts[cartId].find(item => item.id === itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    item.quantity = quantity;
    res.json({ message: 'Item atualizado', cart: carts[cartId] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar carrinho' });
  }
};