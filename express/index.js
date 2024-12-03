import dotenv from 'dotenv';
dotenv.config();
import express, { response } from "express";
import { sequelize } from "./db.js";
import { models } from "./models.js";
import { router } from "./routes/index.js";
import cors from "cors";
import { swaggerUi, specs } from './swagger.js';
import cookieParser from 'cookie-parser';
import createAdmin from './createAdminUser.js';
import upload from './multerConfig.js'; // Импортируем из нового файла

const PORT = 5000;

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Замените на ваш фронтенд URL
    credentials: true
}));
app.use(express.json());

app.use("/api", router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const response = await sequelize.query(`
            select * from roles
            `)
        if (response[0].length === 0){
            await sequelize.query(
            `
            INSERT INTO public.roles ("name","createdAt","updatedAt") VALUES
	 ('Секретарь','2024-12-01 01:35:15.035595+03','2024-12-01 01:35:15.035595+03'),
	 ('Студент','2024-12-01 01:35:15.035595+03','2024-12-01 01:35:15.035595+03'),
	 ('Староста','2024-12-01 01:35:15.035595+03','2024-12-01 01:35:15.035595+03'),
	 ('Админ','2024-12-01 01:35:15.035595+03','2024-12-01 01:35:15.035595+03'),
	 ('Преподаватель','2024-12-01 01:35:15.035595+03','2024-12-01 01:35:15.035595+03');

            `

            )
        }
        createAdmin()
        app.listen(PORT, () => console.log(`сервер на ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
