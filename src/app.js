import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import documentation from './infrastructure/docs.js';
import blogEndpoints from './api-endpoints/blog.js';

const webEngine = express();

webEngine.use(cors());
webEngine.use(express.json());
webEngine.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /api-spec:
 *   get:
 *     summary: Get the Swagger JSON spec
 *     tags: [Utility]
 *     responses:
 *       200:
 *         description: JSON Spec
 */
webEngine.get('/api-spec', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(documentation);
});

webEngine.use('/docs', swaggerUi.serve, swaggerUi.setup(documentation, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Service Documentation'
}));

webEngine.get('/', (req, res) => {
  res.json({
    status: 'online',
    info: 'Custom Content Management API',
    docs: '/docs',
    endpoints: {
      collection: 'GET /v1/entries',
      search: 'GET /v1/entries/search?term=xyz',
      details: 'GET /v1/entries/:id'
    }
  });
});

webEngine.use('/v1', blogEndpoints);

webEngine.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    links: {
      root: '/',
      docs: '/docs'
    }
  });
});

webEngine.use((err, req, res, next) => {
  console.error('[Engine Error]', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Server internal malfunction',
    error: err.message
  });
});

export default webEngine;
