import { QueryTypes } from "sequelize";
import { sequelize } from "../db.js";
import { response } from "express";

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
    async showDisciplines(req, res) {
        const { userId: userId, userLogin: userLogin, userRole: userRole } = req.user;
        console.log(userRole);
      
        try {
          if (userRole === "Студент" || userRole === "Староста") {
            console.log(123);
            const studentIdResult = await sequelize.query(
              `
              SELECT s.id FROM students s
              JOIN users u ON s."userId" = u.id
              WHERE u.id = :userId
              `,
              { replacements: {userId : userId } }
            );
      
            // Логирование результата запроса
            // console.log(studentIdResult);
      
            // Извлечение id из результата запроса
            const studentId = studentIdResult[0][0].id;
            const studentGroupResult = await sequelize.query(
                `
                SELECT g.id
                FROM groups g
                JOIN students s ON g.id = s."groupId"
                WHERE s.id = :studentId
                `,
                { replacements: { studentId } }
              );
              
            const groupId = studentGroupResult[0][0].id

            const studentCourseResult = await sequelize.query(
                `
                SELECT c.id
                FROM courses c
                JOIN groups g ON c.id = g."courseId"
                WHERE g.id = :groupId
                `,
                { replacements: { groupId } }
              );
            console.log(studentCourseResult[0])
            const courseId = studentCourseResult[0][0].id

            const studentDisciplinesResult = await sequelize.query(
                `
                SELECT d."id", d."name"
              FROM disciplines d
              JOIN courses c ON c.id = d."courseId"
              WHERE c.id = :courseId
                `,{ replacements: { courseId } }
              );
            console.log(studentDisciplinesResult[0])

            console.log(studentId);
            return res.status(201).json(studentDisciplinesResult[0])
          }
          else if (userRole === "Преподаватель"){
            
          }
        } catch (error) {
          console.error('Error executing query:', error);
        }
      
        res.json("123");
      }
      


}
export const disciplineController = new DisciplineController()