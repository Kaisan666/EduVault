import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your project',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./controllers/*.js', './routes/*.js'], // Укажите пути к вашим файлам с комментариями
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
