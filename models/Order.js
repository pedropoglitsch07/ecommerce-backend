const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Dados do cliente
  customer: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    cpf: String,
  },

  // Endereço de entrega
  address: {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    complement: String,
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },

  // Itens do pedido
  items: [
    {
      productId: String,
      productName: String,
      quantity: Number,
      price: Number,
    },
  ],

  // Totais
  subtotal: Number,
  shipping: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },

  // Status do pedido
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);