const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies API",
            version: "1.0.0",
            description: "API to managin users, movies and tags"
        },
        servers: [
            {
                url: "http://localhost:3333"
            }
        ],

        components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;