import { sequelize } from "./db.js";
import {DataTypes} from "sequelize"

const User = sequelize.define("user", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    login : {type : DataTypes.STRING(128), unique : true},
    password  : {type : DataTypes.STRING(128)},
    firstName : {type : DataTypes.STRING(128)},
    lastName : {type : DataTypes.STRING(128)},
    middleName : {type : DataTypes.STRING(128), allowNull : true},
    email : {type : DataTypes.STRING(128), allowNull : true},
    number : {type : DataTypes.STRING(25), allowNull : true},

})
const Student = sequelize.define("student", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    course : {type : DataTypes.INTEGER}
})

const Group = sequelize.define("group", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    group_number : {type : DataTypes.INTEGER}
})

const Specialty = sequelize.define("specialty", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128)}
})
const Faculty = sequelize.define("faculty", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type: DataTypes.STRING(128)}
})

const Discipline = sequelize.define("discipline", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128)}
})

const Laboratory = sequelize.define("laboratory", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128)},
    description : {type : DataTypes.STRING(128)}
})

const File_laboratory = sequelize.define('file_laboratory', {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    date : {type : DataTypes.DATE},
    author : {type : DataTypes.STRING(128)}
})

const File = sequelize.define("file", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128)},
    data : {type : DataTypes.BLOB('long')}
})

const Teacher = sequelize.define('teacher', {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
})

const Department = sequelize.define("department", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128)}
})

const Role = sequelize.define("role", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128)}
})

const Permission = sequelize.define("permission", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128)},
    code : {type : DataTypes.INTEGER}
})


User.hasOne(Student)
Student.belongsTo(User)

User.hasOne(Teacher)
Teacher.belongsTo(User)

Department.hasMany(Teacher)
Teacher.belongsTo(Department)

User.belongsToMany(Role, {through : "user_role"})
Role.belongsToMany(User, {through : "user_role"})

Role.belongsToMany(Permission, {through : "role_permission"})
Permission.belongsToMany(Role, {through : "role_permission"})

Group.hasMany(Student)
Student.belongsTo(Group)

Specialty.hasMany(Group)
Group.belongsTo(Specialty)

Faculty.hasMany(Specialty)
Specialty.belongsTo(Faculty)

Group.belongsToMany(Discipline, {through : "discipline_group"})
Discipline.belongsToMany(Group, {through : "discipline_group"})

Discipline.belongsToMany(Laboratory, {through : "discipline_laboratory"})
Laboratory.belongsToMany(Discipline, {through : "discipline_laboratory"})

Laboratory.belongsToMany(File, {through : File_laboratory})
File.belongsToMany(Laboratory, {through : File_laboratory})

export const models = {
    User,
    Student, 
    Group,
Specialty,
Faculty,
Discipline,
Laboratory,
File_laboratory,
File,
Teacher,
Department,
Role,
Permission
}