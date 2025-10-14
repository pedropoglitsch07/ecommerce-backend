# E-commerce - Backend

API REST para um e-commerce desenvolvido com Node.js, Express e MongoDB.

## Características

- CRUD completo de produtos
- Gerenciamento de carrinho
- Criação e rastreamento de pedidos
- Validação de dados no backend
- CORS habilitado

## Tecnologias

- Node.js
- Express.js
- MongoDB
- Mongoose

## Como Rodar Localmente

### Pré-requisitos
- Node.js instalado
- MongoDB rodando
- Git

### Instalação

1. Clone o repositório
```bash
git clone seu-repo-url
cd ecommerce-backend
```

2. Instale as dependências
```bash
npm install
```

3. Crie arquivo `.env`
```
MONGO_URI=mongodb://localhost:27017/ecommerce
PORT=5000
NODE_ENV=development
```

4. Inicie o servidor
```bash
npm run dev
```

O servidor rodará em `http://localhost:5000`

## Endpoints da API

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Buscar produto por ID
- `POST /api/products` - Criar novo produto
- `DELETE /api/products/:id` - Deletar produto

### Pedidos
- `POST /api/orders` - Criar novo pedido
- `GET /api/orders/:id` - Buscar pedido por ID
- `GET /api/orders` - Listar todos os pedidos

## Estrutura do Projeto
```
ecommerce-backend/
├── models/
│   ├── Product.js
│   └── Order.js
├── controllers/
│   ├── productController.js
│   └── orderController.js
├── routes/
│   ├── products.js
│   └── orders.js
├── server.js
├── package.json
└── .env
```

## Autor

Pedro - Desenvolvedor em formação

## Licença

MIT