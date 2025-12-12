# Portfolio Website - Modular Architecture

Portfolio website dengan arsitektur yang terpisah antara Frontend dan Backend.

## Struktur Project

```
portofolio/
├── fe/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── layout/         # Layout components
│   │   │   │   ├── Navigation.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── sections/       # Page sections
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Education.tsx
│   │   │   │   ├── Experience.tsx
│   │   │   │   ├── Skills.tsx
│   │   │   │   ├── Projects.tsx
│   │   │   │   └── Contact.tsx
│   │   │   └── providers/      # Context providers
│   │   │       └── ThemeProvider.tsx
│   │   ├── services/           # API services
│   │   │   ├── api.service.ts
│   │   │   └── contact.service.ts
│   │   └── types/              # TypeScript types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
└── be/                          # Backend (Express)
    ├── src/
    │   ├── controllers/        # Request handlers
    │   │   ├── contact.controller.ts
    │   │   └── analytics.controller.ts
    │   ├── services/           # Business logic
    │   │   ├── contact.service.ts
    │   │   └── analytics.service.ts
    │   ├── repositories/       # Database operations
    │   │   ├── contact.repository.ts
    │   │   └── visitor.repository.ts
    │   ├── routes/             # API routes
    │   │   ├── index.ts
    │   │   ├── contact.routes.ts
    │   │   └── analytics.routes.ts
    │   ├── middlewares/        # Express middlewares
    │   │   ├── error.middleware.ts
    │   │   ├── validation.middleware.ts
    │   │   └── rateLimit.middleware.ts
    │   ├── types/              # TypeScript types
    │   │   └── index.ts
    │   ├── lib/                # Utilities
    │   │   └── prisma.ts
    │   └── server.ts           # Server entry point
    ├── prisma/
    │   └── schema.prisma
    ├── package.json
    └── tsconfig.json
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14 dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Theme**: next-themes (dark/light mode)
- **Animations**: react-intersection-observer

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Security**: Helmet, CORS, Rate Limiting

## Arsitektur Backend

Backend menggunakan **Clean Architecture** dengan layer:

1. **Controllers**: Handle HTTP requests/responses
2. **Services**: Business logic dan validasi
3. **Repositories**: Database operations (abstraksi Prisma)
4. **Routes**: API endpoint definitions
5. **Middlewares**: Request processing (validation, error handling, rate limiting)

## Setup & Installation

### 1. Setup Database

Gunakan PostgreSQL (lokal atau cloud seperti Neon):

```bash
# Install PostgreSQL atau gunakan cloud provider
# Neon.tech (recommended): https://neon.tech
# Supabase: https://supabase.com
```

### 2. Setup Backend

```bash
cd be

# Install dependencies
npm install

# Setup environment variables
copy .env.example .env
# Edit .env dengan database URL Anda

# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Run development server
npm run dev
```

Backend akan berjalan di `http://localhost:4000`

### 3. Setup Frontend

```bash
cd fe

# Install dependencies
npm install

# Setup environment variables
copy .env.example .env
# Edit .env dengan backend URL

# Run development server
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

## API Endpoints

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID
- `DELETE /api/contact/:id` - Delete contact
- `GET /api/contact/stats/count` - Get contact count

### Analytics Endpoints
- `POST /api/analytics` - Track visitor
- `GET /api/analytics` - Get analytics summary
- `GET /api/analytics/visitors` - Get all visitors (admin)
- `DELETE /api/analytics/cleanup` - Clean old data

### Health Check
- `GET /api/health` - Server health check

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://...
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## Development Scripts

### Backend
```bash
npm run dev          # Run development server
npm run build        # Build for production
npm run start        # Start production server
npm run prisma:studio # Open Prisma Studio
```

### Frontend
```bash
npm run dev          # Run development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Deployment

### Backend
Deploy ke:
- **Railway**: Auto-deploy with PostgreSQL
- **Render**: Free tier available
- **Heroku**: With Heroku Postgres

### Frontend
Deploy ke:
- **Vercel**: Recommended (Next.js creator)
- **Netlify**: Good alternative
- **Railway**: Full-stack deployment

## Features

### Frontend
- ✅ Modular component structure
- ✅ Dark/Light mode toggle
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Type-safe API calls
- ✅ SEO optimized

### Backend
- ✅ Clean Architecture
- ✅ Type-safe with TypeScript
- ✅ Request validation
- ✅ Rate limiting
- ✅ Error handling
- ✅ CORS configured
- ✅ Security headers (Helmet)
- ✅ Database abstraction (Repository pattern)

## Security Features

- Input validation
- Rate limiting (5 requests per 15 minutes for contact form)
- CORS configuration
- Helmet security headers
- SQL injection protection (Prisma)
- XSS protection

## License

MIT

## Author

Daffa Hardhan
- Email: dapahardan@gmail.com
- LinkedIn: [linkedin.com/in/daffa-hardhan](https://www.linkedin.com/in/daffa-hardhan)
- GitHub: [github.com/DHard4114](https://github.com/DHard4114)
