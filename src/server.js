require("express-async-errors");
const express = require("express");
const routes = require("./routes/index.js");
const AppError = require("./utils/AppError.js");
const uploadConfig = require("./config/upload.js");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.js");

const app = express();

app.use(express.json());
app.use(routes);

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((error, request, response, next) => {
    
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

app.listen(3333, () => {
    console.log("Server Run!")
});

