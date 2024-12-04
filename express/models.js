import { sequelize } from "./db.js";
import {DataTypes} from "sequelize"

const User = sequelize.define("user", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    login : {type : DataTypes.STRING(128), unique : true, allowNull : false},
    password  : {type : DataTypes.STRING(128), allowNull : false},
    firstName : {type : DataTypes.STRING(128), allowNull : false},
    lastName : {type : DataTypes.STRING(128), allowNull : false},
    middleName : {type : DataTypes.STRING(128), allowNull : true},
    email : {type : DataTypes.STRING(128), allowNull : true},
    number : {type : DataTypes.STRING(25), allowNull : true},

})
const Student = sequelize.define("student", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true}
})

const Group = sequelize.define("group", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING, allowNull : false, unique : true}
})

const Specialty = sequelize.define("specialty", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128), allowNull : false, unique : true}
})

const Course = sequelize.define("course", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    number : {type : DataTypes.INTEGER, allowNull : false}
}, {
    indexes: [
        {
            unique: true,
            fields: ['number', 'specialtyId']
        }
    ]
})

const Faculty = sequelize.define("faculty", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type: DataTypes.STRING(128), allowNull : false}
})

const Discipline = sequelize.define("discipline", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128), allowNull : false}
})

const Laboratory = sequelize.define("laboratory", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128), allowNull : false},
    description : {type : DataTypes.STRING(128)}
})

const File_laboratory = sequelize.define('file_laboratory', {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    date : {type : DataTypes.DATE},
    author : {type : DataTypes.STRING(128), allowNull : false}
})

const File = sequelize.define("file", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128), allowNull : false},
    data : {type : DataTypes.BLOB('long'), allowNull : false}
})

const Teacher = sequelize.define('teacher', {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
})

const Department = sequelize.define("department", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128), allowNull : false}
})

const Role = sequelize.define("role", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128), allowNull : false}
})

const Permission = sequelize.define("permission", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true},
    name : {type : DataTypes.STRING(128), allowNull : false},
    code : {type : DataTypes.INTEGER, allowNull : false}
})

const Secretary = sequelize.define("secretary", {
    id : {type : DataTypes.INTEGER, primaryKey: true, autoIncrement : true}
})


Faculty.hasMany(Secretary)
Secretary.belongsTo(Faculty)

User.hasOne(Secretary)
Secretary.belongsTo(User)

User.hasOne(Student)
Student.belongsTo(User)

User.hasOne(Teacher)
Teacher.belongsTo(User)

// Department.hasMany(Teacher) 
// Teacher.belongsTo(Department)

Role.hasMany(User)
User.belongsTo(Role)


Teacher.belongsToMany(Discipline, {through : "teacher_discipline"})
Discipline.belongsToMany(Teacher, {through : "teacher_discipline"})


Role.belongsToMany(Permission, {through : "role_permission"})
Permission.belongsToMany(Role, {through : "role_permission"})

Group.hasMany(Student)
Student.belongsTo(Group)

Specialty.hasMany(Course)
Course.belongsTo(Specialty)

Course.hasMany(Group)
Group.belongsTo(Course)

Faculty.hasMany(Specialty)
Specialty.belongsTo(Faculty)

Course.hasMany(Discipline)
Discipline.belongsTo(Course)

Discipline.hasMany(Laboratory)
Laboratory.belongsTo(Discipline)

// Laboratory.belongsToMany(File, {through : File_laboratory})
// Laboratory.belongsToMany(File, {through : File_laboratory})
Laboratory.hasMany(File)
File.belongsTo(Laboratory)

export const models = {
    User,
    Student, 
    Group,
    Course,
Specialty,
Faculty,
Discipline,
Laboratory,
File_laboratory,
File,
Teacher,
Department,
Role,
Permission,
Secretary
}