import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";

class DisciplineController {
    async create(req, res) {
        const {courseId} = req.params
        const {name} = req.body;

        if (!name){
            return res.status(400).json({error : "номер группы обязателен"})
        }
        try{
            const result = await sequelize.query(
                `INSERT INTO disciplines ("name", "courseId", "createdAt", "updatedAt") 
                 VALUES (:name, :id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`, // Прямо указываем CURRENT_TIMESTAMP
                {replacements: {id : courseId,name: name,}});
            res.status(201).json(result[0])
        } catch(e){
            res.status(500).json({error : e.message})
        }


    }
    async showAll(req, res) {
        const {courseId} = req.params
        try {
            const result = await sequelize.query(`
                select * from disciplines where "courseId" = :id
                `,
            {replacements : {id : courseId}})
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }
    async showOne(req, res) {
        const {disciplineId} = req.params
        console.log(req.params);
        try {
            const result = await sequelize.query(
                `select * from disciplines where id = :id`, 
                {
                    replacements: {id : disciplineId},
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
                ` UPDATE disciplines AS s 
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
        const {disciplineId} = req.params
        console.log(req.params);
        try {
            const result = await sequelize.query(
                'Delete from disciplines where id = :id', 
                {
                    replacements: { id: disciplineId }
                }
            );
            res.status(201).json("Факультет удален")
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }


}
export const disciplineController = new DisciplineController()