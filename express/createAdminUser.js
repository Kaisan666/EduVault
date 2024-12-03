import { sequelize } from "./db.js";
import bcrypt from "bcrypt"

async function createAdmin(){
    const admin = await sequelize.query(
        `
        select * from users where "roleId" = 4
        `
    )
    console.log(admin[0])
    if (admin[0].length === 0){
        const hashpass = await bcrypt.hash("admin", 5);
        await sequelize.query(
            `
            insert into users ("firstName", "lastName", "middleName", "login", "password", "roleId", "createdAt", "updatedAt" )
            values ('admin', 'admin', 'admin', 'admin', :pass, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            `, {replacements : {pass : hashpass}}
        )
    }
}

export default createAdmin