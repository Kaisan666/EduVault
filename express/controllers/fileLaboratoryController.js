    import { QueryTypes } from "sequelize";
    import { sequelize } from "../db.js";
    import multer from "multer";

    const upload = multer({ storage: multer.memoryStorage() });

    class LabFileController {
        async create(req, res) {
            const {Name} = req.body
             const file = req.file;

             file.originalname = Name

    if (!file) {
        console.error('Файл не был загружен');
        return res.status(400).json({ error: "Файл обязателен" });
    }
    try {
        const result = await sequelize.query(
            `INSERT INTO files ("name", "data", "createdAt", "updatedAt") VALUES (:name, :data, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
            {
                replacements: {
                    name: Name,
                    data: file.buffer
                }
                // type: sequelize.QueryTypes.INSERT
            }
        );
        // console.log(result[0][0].id)

        return res.json("все успешно загружено");
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
        }
        async showAll(req, res) {
            const {disciplineId} = req.params
            try {
                const result = await sequelize.query(`
                    select * from laboratories where "disciplineId" = :id
                    `,
                {replacements : {id : disciplineId}})
                res.status(201).json(result[0])
            } catch (error) {
                res.status(500).json({error : error.message})
            }
        }
        async showOne(req, res) {
            const {groupId} = req.params
            console.log(req.params);
            try {
                const result = await sequelize.query(
                    `select * from groups where id = :id`, 
                    {
                        replacements: {id : groupId},
                        type: QueryTypes.SELECT
                    }
                );
                res.status(201).json(result[0])
            } catch (error) {
                res.status(500).json({error : error.message})
            }
        } 
        async update(req, res) {
            const {disciplineId} = req.params;
            const {name} = req.body;
            if (!name){
                return res.status(400).json({error : "сначала задайте нужно название направления"})
            }
            try {
                const result = await sequelize.query(
                    ` UPDATE laboratories AS s 
                        SET "name" = :name, "updatedAt" = CURRENT_TIMESTAMP 
                        WHERE id = :id 
                        RETURNING *;`,
                        {replacements : {name : name, id : disciplineId}}
                    )
                res.status(201).json(result[0][0])
            } catch (error) {
                res.status(500).json({error : error.message})
            }}
        async delete(req, res) {
            const {groupId} = req.params
            console.log(req.params);
            try {
                const result = await sequelize.query(
                    'Delete from group where id = :id', 
                    {
                        replacements: { id: groupId }
                    }
                );
                res.status(201).json("Факультет удален")
            } catch (error) {
                res.status(500).json({error : error.message})
            }
        }

        async download(req, res) {
            const { fileId } = req.params;
        
            try {
                // Выполняем SQL-запрос для получения файла из базы данных
                const result = await sequelize.query(
                    `SELECT name, data FROM files WHERE id = :fileId`,
                    {
                        replacements: { fileId },
                        type: sequelize.QueryTypes.SELECT
                    }
                );
                if (result.length === 0) {
                    return res.status(404).json({ error: "Файл не найден" });
                }
        
                const file = result[0];
        
                // Устанавливаем заголовки для отправки файла
                res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file.name)}"`);
                res.setHeader('Content-Type', 'application/octet-stream');
        
                // Отправляем данные файла клиенту
                res.send(file.data);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        }


    }
    export const labFileController = new LabFileController()