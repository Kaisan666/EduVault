import { pool } from "../db"

class GroupController {
    async create(req, res) {
        const {group_number, specialtyId} = req.body;

        if (!group_number || !specialtyId){
            return res.status(400).json({error : "поле номер группы или направление не указано!"})
        }
        try{
            const result = await pool.query(`
                INSERT INTO secretaries (group_number, specialtyId) VALUES ($1, $2) RETURNING *
                `
            [group_number, specialtyId]
            )
            res.status(201).json(result.rows[0])
        } catch(e){
            res.status(500).json({error : e.message})
        }


    }
    async showAll(req, res) {

    }
    async showOne(req, res) {

    }
    async editGroup(req, res) {

    }
    async deleteGroup(req, res) {

    }


}
export const groupController = new GroupController()