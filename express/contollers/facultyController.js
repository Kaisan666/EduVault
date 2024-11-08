import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";
const d = {
    'createdAt': sequelize.literal('CURRENT_TIMESTAMP'),
  'updatedAt': sequelize.literal('CURRENT_TIMESTAMP')
}
class FacultyController {
    
    async create(req, res) {
        const {name} = req.body;

        if (!name){
            return res.status(400).json({error : "название факультета обязательно"})
        }
        try{
            const result = await sequelize.query(
                `INSERT INTO faculties ("name", "createdAt", "updatedAt") 
                 VALUES (:name, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`, // Прямо указываем CURRENT_TIMESTAMP
                {replacements: {name: name,}});
            res.status(201).json(result[0])
        } catch(e){
            res.status(500).json({error : e.message})
        }


    }
    async showAll(req, res) {
        try {
            const result = await sequelize.query(`
                select * from faculties`)
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }
    async showOne(req, res) {
        const {facultyId} = req.params
        console.log(req.params);
        try {
            const result = await sequelize.query(
                'SELECT * FROM faculties WHERE id = :id', 
                {
                    replacements: { id: facultyId },  // Используем объект с именованными параметрами
                    type: QueryTypes.SELECT
                }
            );
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    } 
    async update(req, res) {
        const {facultyId} = req.params;
        const {name} = req.body;
        if (!name){
            return res.status(400).json({error : "сначала задайте нужно название факультета"})
        }
        try {
            const result = await sequelize.query(
                `update faculties set name = :name, "updatedAt" = CURRENT_TIMESTAMP where id = :id RETURNING *`,
                    {replacements : {name : name, id : facultyId}}
                )
            res.status(201).json(result[0][0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }}
    async delete(req, res) {
        const {facultyId} = req.params
        console.log(req.params);
        try {
            const result = await sequelize.query(
                'Delete from faculties where id = :id', 
                {
                    replacements: { id: facultyId }
                }
            );
            res.status(201).json("Факультет удален")
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }


}
export const facultyController = new FacultyController()