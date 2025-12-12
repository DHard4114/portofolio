# Portfolio Backend API

Backend Express.js dengan Clean Architecture untuk website portfolio Daffa Hardhan.

## 🚀 Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Database
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP logger

## 📦 Dependencies (Latest Versions)

```json
{
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "helmet": "^8.0.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/morgan": "^1.9.9",
    "@types/node": "^22.10.1",
    "prisma": "^5.22.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.7.2"
  }
}
```

## 🏗️ Struktur Project

```
be/
├── src/
│   ├── controllers/              # HTTP request handlers
│   │   ├── contact.controller.ts
│   │   └── analytics.controller.ts
│   ├── services/                 # Business logic
│   │   ├── contact.service.ts
│   │   └── analytics.service.ts
│   ├── repositories/             # Database operations
│   │   ├── contact.repository.ts
│   │   └── visitor.repository.ts
│   ├── routes/                   # API endpoints
│   │   ├── index.ts
│   │   ├── contact.routes.ts
│   │   └── analytics.routes.ts
│   ├── middlewares/              # Express middlewares
│   │   ├── error.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   ├── lib/                      # Utilities
│   │   └── prisma.ts
│   └── server.ts                 # App entry point
├── prisma/
│   └── schema.prisma             # Database schema
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

```bash
copy .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
```

### 3. Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# (Optional) Open Prisma Studio
npm run prisma:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

## 📋 API Endpoints

### Health Check
```
GET /api/health
```

### Contact Endpoints
```
POST   /api/contact          # Submit contact form (Rate limited: 5 req/15min)
GET    /api/contact          # Get all contacts
GET    /api/contact/count    # Get contact count
GET    /api/contact/:id      # Get contact by ID
DELETE /api/contact/:id      # Delete contact
```

### Analytics Endpoints
```
POST   /api/analytics/visit     # Track page visit
GET    /api/analytics/summary   # Get analytics summary
DELETE /api/analytics/cleanup   # Cleanup old data
```

## 🗄️ Database Schema

### Contact
- id (UUID)
- name (String)
- email (String)
- subject (String)
- message (Text)
- createdAt (DateTime)
- updatedAt (DateTime)

### Visitor
- id (UUID)
- ipAddress (String?)
- userAgent (Text?)
- firstVisit (DateTime)
- lastVisit (DateTime)

### PageView
- id (UUID)
- visitorId (UUID) - Foreign key to Visitor
- page (String)
- visitedAt (DateTime)

## 🔒 Security Features

- ✅ Helmet.js - Security headers
- ✅ CORS - Cross-origin configuration
- ✅ Rate limiting - Prevent spam (5 requests per 15 minutes)
- ✅ Input validation - Validate contact form
- ✅ Error handling - Global error middleware
- ✅ SQL injection protection - Prisma ORM

## 📜 Available Scripts

```bash
npm run dev              # Run development server
npm run build            # Build for production
npm run start            # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:push      # Push schema to database
npm run prisma:migrate   # Create migration
npm run prisma:studio    # Open Prisma Studio GUI
```

## 🏛️ Clean Architecture

```
Controllers → Services → Repositories → Database
     ↓           ↓            ↓
  HTTP      Business      Data Access
 Handling    Logic         Layer
```

### Layer Responsibilities:

1. **Controllers** - Handle HTTP requests/responses
2. **Services** - Business logic & validation
3. **Repositories** - Database operations
4. **Routes** - Define API endpoints
5. **Middlewares** - Request processing

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection string | - |

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env
npm run prisma:studio
```

### Type Errors
```bash
# Regenerate Prisma Client
npm run prisma:generate
```

### Port Already in Use
```bash
# Change PORT in .env
# Or kill process on port 5000
```

## 📧 Contact

**Daffa Hardhan**
- Email: dapahardan@gmail.com
- GitHub: [DHard4114](https://github.com/DHard4114)
- LinkedIn: [daffa-hardhan](https://www.linkedin.com/in/daffa-hardhan)

---

© 2025 Daffa Hardhan. All rights reserved.
