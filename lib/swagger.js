// lib/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

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
        url: 'http://localhost:3000', // Change this to your server's URL
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
