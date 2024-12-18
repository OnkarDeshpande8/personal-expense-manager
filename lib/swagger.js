// lib/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Expense Manager API',
      version: '1.0.0',
      description: 'API documentation for the Personal Expense Manager project',
    },
    servers: [
      {
        url: apiUrl,
      },
    ],
    tags: [
      {
        name: 'ExpenseManager',
        description: 'Operations related to Expense Manager',
      },
      {
        name: 'GoogleSheet',
        description: 'Operations related to Google Sheets',
      },
    ],
  },
  // The path to the API routes
  apis: ['./src/pages/api/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
