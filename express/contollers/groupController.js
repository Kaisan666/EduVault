import { QueryTypes } from "sequelize";

class GroupController {
    async create(req, res) {
        const {specialtyId} = req.params
        const {name} = req.body;

        if (!name){
            return res.status(400).json({error : "номер группы обязателен"})
        }
        try{
            const result = await sequelize.query(
                `INSERT INTO groups ("name", "specialtyId", "createdAt", "updatedAt") 
                 VALUES (:name, :id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`, // Прямо указываем CURRENT_TIMESTAMP
                {replacements: {id : specialtyId,name: name,}});
            res.status(201).json(result[0])
        } catch(e){
            res.status(500).json({error : e.message})
        }


    }
    async showAll(req, res) {
        const {specialtyId} = req.params
        try {
            const result = await sequelize.query(`
                select * from groups where "specialty" = :id
                `,
            {replacements : {id : specialtyId}})
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
        const {groupId} = req.params;
        const {name} = req.body;
        if (!name){
            return res.status(400).json({error : "сначала задайте нужно название направления"})
        }
        try {
            const result = await sequelize.query(
                ` UPDATE groups AS s 
                    SET "name" = :name, "updatedAt" = CURRENT_TIMESTAMP 
                    WHERE id = :id 
                    RETURNING *;`,
                    {replacements : {name : name, id : groupId}}
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


}
export const groupController = new GroupController()