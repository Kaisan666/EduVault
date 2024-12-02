import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { sequelize } from "./db.js";
import { models } from "./models.js";
import { router } from "./routes/index.js";
import cors from "cors";
import { swaggerUi, specs } from './swagger.js';
import cookieParser from 'cookie-parser';
const PORT = 5000;

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Замените на ваш фронтенд URL
    credentials: true
}));
app.use(express.json());
app.use("/api", router);

// Настройка Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`сервер на ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();