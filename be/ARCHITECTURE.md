# Backend Architecture

## 📁 Folder Structure

```
be/
├── src/
│   ├── config/           # Configuration files
│   │   └── index.ts      # Centralized config
│   ├── controllers/      # HTTP request handlers
│   │   ├── contact.controller.ts
│   │   └── analytics.controller.ts
│   ├── services/         # Business logic layer
│   │   ├── contact.service.ts
│   │   └── analytics.service.ts
│   ├── repositories/     # Data access layer
│   │   ├── contact.repository.ts
│   │   └── visitor.repository.ts
│   ├── middlewares/      # Express middlewares
│   │   ├── error.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── routes/           # API route definitions
│   │   ├── index.ts
│   │   ├── contact.routes.ts
│   │   └── analytics.routes.ts
│   ├── types/            # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── errors.ts     # Custom error classes
│   │   ├── response.ts   # Standard API response
│   │   └── logger.ts     # Logging utility
│   ├── lib/              # External libraries setup
│   │   └── prisma.ts
│   └── server.ts         # Application entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── package.json
├── tsconfig.json
└── .env.example
```

## 🏗️ Architecture Principles

### Clean Architecture Layers

1. **Controllers Layer** (`controllers/`)
   - Handles HTTP requests/responses
   - Input validation
   - Calls appropriate service methods
   - Returns standardized API responses

2. **Services Layer** (`services/`)
   - Contains business logic
   - Data validation and transformation
   - Orchestrates repository operations
   - Error handling

3. **Repositories Layer** (`repositories/`)
   - Database abstraction
   - CRUD operations
   - Direct Prisma interactions
   - Data queries

4. **Routes Layer** (`routes/`)
   - Endpoint definitions
   - Middleware configuration
   - Route grouping

### Key Features

✅ **Dependency Injection** - Services inject repositories, controllers inject services
✅ **Single Responsibility** - Each file has one clear purpose
✅ **Separation of Concerns** - Clear boundaries between layers
✅ **Error Handling** - Centralized error middleware with custom error classes
✅ **Logging** - Context-based logging with Logger utility
✅ **Configuration** - Centralized config management
✅ **Type Safety** - Full TypeScript support with interfaces
✅ **Rate Limiting** - Configurable rate limiting for endpoints
✅ **Validation** - Input validation middleware
✅ **Standardized Responses** - Consistent API response format

## 🔄 Request Flow

```
Client Request
    ↓
Express App (server.ts)
    ↓
Middleware (helmet, cors, morgan)
    ↓
Routes (routes/)
    ↓
Middleware (rate limit, validation)
    ↓
Controllers (controllers/)
    ↓
Services (services/)
    ↓
Repositories (repositories/)
    ↓
Database (Prisma)
    ↓
Response (utils/response.ts)
    ↓
Client Response
```

## 📊 Modules

### Contact Module
- **Controller**: `contact.controller.ts`
- **Service**: `contact.service.ts`
- **Repository**: `contact.repository.ts`
- **Routes**: `contact.routes.ts`
- **Features**: Create, Read, Delete contacts with validation

### Analytics Module
- **Controller**: `analytics.controller.ts`
- **Service**: `analytics.service.ts`
- **Repository**: `visitor.repository.ts`
- **Routes**: `analytics.routes.ts`
- **Features**: Track visits, page views, analytics summary

## 🛠️ Utilities

### Custom Error Handling
```typescript
throw new AppError('Error message', HttpStatus.BAD_REQUEST)
```

### Standardized Responses
```typescript
ApiResponse.success(res, data, message)
ApiResponse.error(res, error, message, statusCode)
ApiResponse.created(res, data, message)
ApiResponse.notFound(res, message)
ApiResponse.badRequest(res, message)
```

### Logging
```typescript
const logger = createLogger('ServiceName')
logger.info('Info message')
logger.error('Error message', error)
logger.warn('Warning message')
logger.debug('Debug message')
```

## 🔐 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Configurable request throttling
- **Input Validation**: Request data validation
- **Error Sanitization**: Safe error messages in production

## 📈 Scalability

The modular architecture allows for:
- Easy addition of new modules
- Independent testing of layers
- Simplified maintenance
- Clear code organization
- Team collaboration with minimal conflicts
- Horizontal scaling readiness
