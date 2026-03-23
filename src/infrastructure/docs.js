import swaggerJsdoc from 'swagger-jsdoc';

const configOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Custom Blog Engine API',
      version: '1.1.0',
      description: 'A restructured and cleaned API for managing personal blog entries.',
      contact: {
        name: 'DevTeam',
        email: 'dev@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Development Server'
      }
    ],
    tags: [
      {
        name: 'Entries',
        description: 'Operations related to blog entries'
      }
    ],
    components: {
      schemas: {
        BlogEntry: {
          type: 'object',
          required: ['headline', 'body', 'contributor', 'publishDate', 'topic'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier',
              example: 101
            },
            headline: {
              type: 'string',
              description: 'The title or headline of the entry',
              minLength: 3,
              maxLength: 200,
              example: 'Exploring Modern Node.js'
            },
            body: {
              type: 'string',
              description: 'Main content text',
              minLength: 10,
              example: 'In this post, we cover the latest features of Node.js...'
            },
            contributor: {
              type: 'string',
              description: 'The author of the entry',
              minLength: 2,
              maxLength: 100,
              example: 'Jean Paul'
            },
            publishDate: {
              type: 'string',
              format: 'date',
              description: 'Publication date (YYYY-MM-DD)',
              example: '2026-04-01'
            },
            topic: {
              type: 'string',
              description: 'Subject category',
              minLength: 2,
              maxLength: 50,
              example: 'Programming'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Associated keywords',
              example: ['javascript', 'backend']
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        EntryUpdate: {
          type: 'object',
          properties: {
            headline: { type: 'string' },
            body: { type: 'string' },
            contributor: { type: 'string' },
            publishDate: { type: 'string', format: 'date' },
            topic: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } }
          }
        },
        Envelope: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            payload: { type: 'object' },
            message: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/app.js']
};

const documentation = swaggerJsdoc(configOptions);

export default documentation;
