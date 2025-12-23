E-Commerce Backend API

A production-ready E-commerce backend built using Node.js, Express.js, and MongoDB, following clean MVC architecture.
This backend handles authentication, product management, cart, orders, and payments with secure APIs.

🚀 Features

🔐 JWT Authentication
User Register & Login
Token-based route protection

👤 User & Admin Management
Admin-only routes using middleware
Secure role-based access control

📦 Product Management
Create, update, delete & fetch products
Clean RESTful APIs

🛒 Cart Management
Add/remove products from cart
User-specific cart handling

📑 Order Management
Place orders from cart
View user order history

💳 Payment Handling
Payment controller & schema ready
Razorpay integration structure added

🗄 MongoDB Integration
Mongoose schemas & relations
Scalable database design

🛠 Tech Stack
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Auth: JSON Web Token (JWT)
Payment: Razorpay (Structure ready)
Tools: Postman, Git, GitHub

Folder structure

backend/
│── config/
│   ├── db.js              # MongoDB connection
│   └── razorpay.js        # Razorpay configuration
│
│── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── paymentController.js
│
│── middleware/
│   ├── authMiddleware.js  # JWT verification
│   └── adminMiddleware.js # Admin access control
│
│── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Order.js
│   └── Payment.js
│
│── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── paymentRoutes.js
│
│── utils/
│
│── .env
│── .gitignore
│── package.json
│── package-lock.json


⚙️ Environment Variables

Create a .env file inside backend/ folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret


▶️ Installation & Run
npm install
npm run dev

Server will start at:
http://localhost:5000


🔑 API Routes Overview

🔐 Auth Routes
POST /api/auth/register
POST /api/auth/login

📦 Product Routes
POST /api/products (Admin)
GET /api/products
PUT /api/products/:id
DELETE /api/products/:id

🛒 Cart Routes
POST /api/cart
GET /api/cart
DELETE /api/cart/:id

📑 Order Routes
POST /api/orders
GET /api/orders/my-orders

💳 Payment Routes
POST /api/payment/create-order
POST /api/payment/verify

🔮 Future Improvements
Product reviews & ratings
Order status tracking
Payment webhooks
Admin dashboard APIs
