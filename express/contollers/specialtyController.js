import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";
const d = {
    'createdAt': sequelize.literal('CURRENT_TIMESTAMP'),
  'updatedAt': sequelize.literal('CURRENT_TIMESTAMP')
}
class SpecialtyController {
    
    async create(req, res) {
        const {facultyId,name} = req.body;

        if (!name){
            return res.status(400).json({error : "название факультета обязательно"})
        }
        try{
            const result = await sequelize.query(
                `INSERT INTO specialties ("name", "facultyId", "createdAt", "updatedAt") 
                 VALUES (:name, :id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`, // Прямо указываем CURRENT_TIMESTAMP
                {replacements: {id : facultyId,name: name,}});
            res.status(201).json(result[0])
        } catch(e){
            res.status(500).json({error : e.message})
        }


    }
    async showAll(req, res) {
        const {facultyId} = req.body
        try {
            const result = await sequelize.query(`
                select s.name as specialtyName, s.id, s."createdAt", s."updatedAt", f.name as facultyName
                from  specialties as s JOIN faculties as f on s."facultyId" = f.id where f.id = :id
                `,
            {replacements : {id : facultyId}})
            res.status(201).json(result[0][0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }
    async showOne(req, res) {
        const {specialtyId} = req.params
        const {facultyId} = req.body
        console.log(req.params);
        try {
            const result = await sequelize.query(
                `select s.name as specialtyName, s.id, s."createdAt", s."updatedAt", f.name as facultyName
                from  specialties as s JOIN faculties as f on s."facultyId" = f.id where f.id = :facultyId and s.id = :specialtyId`, 
                {
                    replacements: {facultyId : facultyId, specialtyId: specialtyId},
                    type: QueryTypes.SELECT
                }
            );
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    } 
    async update(req, res) {
        const {specialtyId} = req.params;
        const {name, facultyId} = req.body;
        if (!name){
            return res.status(400).json({error : "сначала задайте нужно название направления"})
        }
        try {
            const result = await sequelize.query(
                ` UPDATE specialties AS s
            SET 
                name = :name, 
                "updatedAt" = CURRENT_TIMESTAMP
            WHERE 
                s.id = :id 
                AND s."facultyId" = (SELECT id FROM faculties WHERE id = :facultyId)
            RETURNING *;`,
                    {replacements : {name : name, facultyId : facultyId, id : specialtyId}}
                )
            res.status(201).json(result[0][0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }}
    async delete(req, res) {
        const {specialtyId} = req.params
        const {facultyId} = req.body
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
export const specialtyController = new SpecialtyController()