import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";
const d = {
    'createdAt': sequelize.literal('CURRENT_TIMESTAMP'),
  'updatedAt': sequelize.literal('CURRENT_TIMESTAMP')
}
class SpecialtyController {
    
    async create(req, res) {
        const {facultyId} = req.params
        const {name} = req.body;

        if (!name){
            return res.status(400).json({error : "название факультета обязательно"})
        }
        try{
            const result = await sequelize.query(
                `INSERT INTO specialties ("name", "facultyId", "createdAt", "updatedAt") 
                 VALUES (:name, :id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`, // Прямо указываем CURRENT_TIMESTAMP
                {replacements: {id : facultyId ,name: name,}});
            res.status(201).json(result[0])
        } catch(e){
            res.status(500).json({error : e.message})
        }


    }
    async showAll(req, res) {
        const {facultyId} = req.params
        try {
            const result = await sequelize.query(`
                select * from specialties where "facultyId" = :id
                `,
            {replacements : {id : facultyId}})
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }
    async showOne(req, res) {
        const {specialtyId} = req.params
        console.log(req.params);
        try {
            const result = await sequelize.query(
                `select * from specilaties where id = :id`, 
                {
                    replacements: {id : specialtyId},
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
        const {name} = req.body;
        if (!name){
            return res.status(400).json({error : "сначала задайте нужно название направления"})
        }
        try {
            const result = await sequelize.query(
                ` update specilties as s set "name" = :name, "updatedAt" = CURRENT_TIMESTAMP where id = :id
            RETURNING *;`,
                    {replacements : {name : name, id : specialtyId}}
                )
            res.status(201).json(result[0])
        } catch (error) {
            res.status(500).json({error : error.message})
        }}
    async delete(req, res) {
        const {specialtyId} = req.params
        console.log(req.params);
        try {
            const result = await sequelize.query(
                'Delete from specialties where id = :id', 
                {
                    replacements: { id: specialtyId }
                }
            );
            res.status(201).json("Факультет удален")
        } catch (error) {
            res.status(500).json({error : error.message})
        }
    }


}
export const specialtyController = new SpecialtyController()