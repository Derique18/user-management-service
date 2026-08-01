# User Management Microservice

A production-grade, scalable RESTful API for **User Authentication** and **Profile Management**, built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Dependencies](#-project-dependencies)
- [Prerequisites](#-prerequisites)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [Available Scripts](#-available-scripts)
- [API Documentation](#-api-documentation)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Security Features](#-security-features)
- [License](#-license)

---

# 🚀 Features

- 🔐 JWT Authentication (Access & Refresh Tokens)
- 🔒 Secure password hashing using **bcryptjs**
- 👤 User Registration & Login
- 📄 User Profile Management
- ✏️ Update User Profile
- ❌ Delete User Account
- ✅ Request Validation using **Joi**
- 🛡 Protected Routes using JWT Middleware
- 🗄 PostgreSQL database with **Prisma ORM**
- 📚 Interactive Swagger/OpenAPI Documentation
- 🏗 Clean Layered Architecture
- 💯 Fully written in TypeScript

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript Runtime |
| Express.js | Web Framework |
| TypeScript | Type Safety |
| PostgreSQL | Relational Database |
| Prisma ORM | Database ORM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Joi | Request Validation |
| Swagger | API Documentation |

---

# 📦 Project Dependencies

## Production Dependencies

| Package | Purpose |
|----------|---------|
| @prisma/client | Prisma Database Client |
| bcryptjs | Password Hashing |
| dotenv | Environment Variables |
| express | Backend Framework |
| joi | Request Validation |
| jsonwebtoken | JWT Authentication |
| swagger-jsdoc | Generate Swagger Specs |
| swagger-ui-express | Swagger UI |

---

## Development Dependencies

| Package | Purpose |
|----------|---------|
| prisma | Prisma CLI |
| typescript | TypeScript Compiler |
| nodemon | Auto Restart Server |
| @types/node | Node Type Definitions |
| @types/express | Express Type Definitions |
| @types/bcryptjs | bcryptjs Types |
| @types/jsonwebtoken | JWT Types |
| @types/swagger-jsdoc | Swagger Types |
| @types/swagger-ui-express | Swagger UI Types |

---

# 📋 Prerequisites

Before running this project, ensure the following are installed:

- **Node.js** (v22 or later)
- **npm** (v10 or later)
- **PostgreSQL**
- **Git**

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# PostgreSQL Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_management_db?schema=public"

# JWT Configuration
JWT_SECRET="your_super_secret_access_jwt_key_32_chars_long"
JWT_REFRESH_SECRET="your_super_secret_refresh_jwt_key_32_chars_long"

JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Derique18/user-management-service.git

cd user-management-service
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file using the example above.

---

## 4. Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

---

## 5. Generate Prisma Client

```bash
npx prisma generate
```

---

## 6. Start Development Server

```bash
npm run dev
```

Expected Output:

```text
[nodemon] starting...
Server running on http://localhost:3000

Swagger Docs:
http://localhost:3000/api-docs
```

---

## 7. Build for Production

```bash
npm run build
```

---

## 8. Start Production Server

```bash
npm start
```

---

# 📜 Available Scripts

| Script | Description |
|----------|-------------|
| npm run dev | Start development server |
| npm run build | Compile TypeScript |
| npm start | Start production server |
| npx prisma migrate dev | Run database migrations |
| npx prisma generate | Generate Prisma Client |

---

# 📚 API Documentation

Once the server is running, Swagger documentation is available at:

```
http://localhost:3000/api-docs
```

---

# 🌐 API Endpoints

| Method | Endpoint | Access | Description |
|---------|----------|--------|-------------|
| GET | `/` | Public | Health Check |
| POST | `/api/auth/register` | Public | Register User |
| POST | `/api/auth/login` | Public | Login User |
| GET | `/api/users/profile` | Protected | Get User Profile |
| PUT | `/api/users/profile` | Protected | Update User Profile |
| DELETE | `/api/users/profile` | Protected | Delete User Account |
| GET | `/api-docs` | Public | Swagger Documentation |

---

# 📁 Project Structure

```text
user-management-service/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── swagger.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   │
│   ├── interfaces/
│   │   └── user.interface.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── user.routes.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   │
│   ├── validations/
│   │   └── user.validation.ts
│   │
│   └── app.ts
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🏗 Architecture

The application follows a **Layered Architecture**, making the project easy to maintain, scale, and test.

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

### Layer Responsibilities

### Routes
Defines API endpoints and maps requests to controllers.

### Controllers
Handles HTTP requests and responses.

### Services
Contains business logic.

### Prisma ORM
Communicates with the PostgreSQL database.

### PostgreSQL
Stores persistent application data.

---

# 🔐 Security Features

- Passwords are hashed using **bcryptjs**
- JWT Authentication
- Protected Routes
- Input Validation with Joi
- Environment Variables for sensitive secrets
- Type-safe database operations using Prisma

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute this project.