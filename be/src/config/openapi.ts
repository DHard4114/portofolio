/**
 * @file config/openapi.ts
 * @description OpenAPI specification for API documentation
 * @module Config/OpenAPI
 * 
 * Defines the complete OpenAPI 3.0 specification for all API endpoints.
 * Used by Scalar to generate interactive API documentation.
 * 
 * @author Daffa Hardhan
 * @created 2024
 */

export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Daffa Hardhan Portfolio API',
    version: '1.0.0',
    description: 'Backend API for portfolio website with contact form and analytics tracking',
    contact: {
      name: 'Daffa Hardhan',
      email: 'daffa@example.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
    {
      url: 'https://api.daffahardhan.com',
      description: 'Production server',
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'Health check endpoints',
    },
    {
      name: 'Contact',
      description: 'Contact form management',
    },
    {
      name: 'Analytics',
      description: 'Visitor tracking and analytics',
    },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check endpoint',
        description: 'Check if the API server is running',
        responses: {
          '200': {
            description: 'Server is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'OK',
                    },
                    message: {
                      type: 'string',
                      example: 'Server is running',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/contact': {
      post: {
        tags: ['Contact'],
        summary: 'Submit contact form',
        description: 'Create a new contact message (Rate limited: 5 requests per 15 minutes)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'subject', 'message'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'John Doe',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'john@example.com',
                  },
                  subject: {
                    type: 'string',
                    example: 'Project Inquiry',
                  },
                  message: {
                    type: 'string',
                    minLength: 10,
                    example: 'I would like to discuss a potential project...',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Contact created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ContactResponse',
                },
              },
            },
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '429': {
            description: 'Too many requests',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Contact'],
        summary: 'Get all contacts',
        description: 'Retrieve all contact messages (Admin only)',
        responses: {
          '200': {
            description: 'List of contacts',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Contact',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/contact/count': {
      get: {
        tags: ['Contact'],
        summary: 'Get contact count',
        description: 'Get total number of contact messages',
        responses: {
          '200': {
            description: 'Contact count',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        count: {
                          type: 'number',
                          example: 42,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/contact/{id}': {
      get: {
        tags: ['Contact'],
        summary: 'Get contact by ID',
        description: 'Retrieve a specific contact message',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Contact ID',
          },
        ],
        responses: {
          '200': {
            description: 'Contact details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      $ref: '#/components/schemas/Contact',
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Contact not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Contact'],
        summary: 'Delete contact',
        description: 'Delete a contact message',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Contact ID',
          },
        ],
        responses: {
          '200': {
            description: 'Contact deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Contact deleted successfully',
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Contact not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/analytics/visit': {
      post: {
        tags: ['Analytics'],
        summary: 'Track page visit',
        description: 'Record a page visit for analytics',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['page'],
                properties: {
                  page: {
                    type: 'string',
                    example: '/',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Visit tracked successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Visit tracked successfully',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/analytics/summary': {
      get: {
        tags: ['Analytics'],
        summary: 'Get analytics summary',
        description: 'Retrieve visitor statistics and analytics data',
        responses: {
          '200': {
            description: 'Analytics summary',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      $ref: '#/components/schemas/AnalyticsSummary',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/analytics/cleanup': {
      delete: {
        tags: ['Analytics'],
        summary: 'Cleanup old data',
        description: 'Delete visitor records older than specified days',
        parameters: [
          {
            name: 'days',
            in: 'query',
            schema: {
              type: 'integer',
              default: 90,
            },
            description: 'Delete records older than this many days',
          },
        ],
        responses: {
          '200': {
            description: 'Data cleaned up successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        deletedCount: {
                          type: 'number',
                          example: 150,
                        },
                      },
                    },
                    message: {
                      type: 'string',
                      example: 'Deleted 150 old records',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Contact: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'clx123abc456',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john@example.com',
          },
          subject: {
            type: 'string',
            example: 'Project Inquiry',
          },
          message: {
            type: 'string',
            example: 'I would like to discuss a potential project...',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-12-12T10:30:00Z',
          },
        },
      },
      ContactResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Contact created successfully',
          },
          data: {
            $ref: '#/components/schemas/Contact',
          },
        },
      },
      AnalyticsSummary: {
        type: 'object',
        properties: {
          totalVisitors: {
            type: 'number',
            example: 1234,
          },
          totalPageViews: {
            type: 'number',
            example: 5678,
          },
          uniqueVisitors: {
            type: 'number',
            example: 987,
          },
          topPages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                page: {
                  type: 'string',
                  example: '/',
                },
                views: {
                  type: 'number',
                  example: 150,
                },
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          error: {
            type: 'string',
            example: 'Error message',
          },
        },
      },
    },
  },
}
