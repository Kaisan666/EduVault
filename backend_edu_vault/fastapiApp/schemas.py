from datetime import date
from typing import List

from pydantic import BaseModel

class PersonBase(BaseModel):
    id : int
    lastName : str
    firstName : str
    patronymic : str
    email : str
    phoneNumber : str
    student_id : int | None = None
    lecturer_id : int | None = None

class Person(PersonBase):

    student : "StudentBase" | None = None
    lecturer : "LecturerBase" | None = None
    class Config:
        orm_mode = True

class StudentBase(BaseModel):
    id : int
    group_id : int
    course : int

class Student(StudentBase):
    group : "GroupBase"
    person : "PersonBase"
    class Config:
        orm_mode = True

class LecturerBase(BaseModel):
    id : int
    department_id : int

class Lecturer(LecturerBase):
    department : "DepartmentBase"
    person : PersonBase
    class Config:
        orm_mode = True
class DepartmentBase(BaseModel):
    id : int
    name : str

class Department(DepartmentBase):
    lecturer : LecturerBase
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    id : int
    login : str
    person_id : int

class UserCreate(UserBase):
    password : str

class User(UserBase):
    person : PersonBase
    role : List["RoleBase"]
    class Config:
        orm_mode = True


class RoleBase(BaseModel):
    id : int
    name : str
    code : int

class Role(RoleBase):
    user : List["UserBase"]
    permission : List["PermissionBase"]
    class Config:
        orm_mode = True
class PermissionBase(BaseModel):
    id : int
    name : str
    code : int

class Permission(PermissionBase):
    role : List["RoleBase"]
    class Config:
        orm_mode = True

class GroupBase(BaseModel):
    id : int
    group_number : int
    specialization_id : int

class Group(GroupBase):
    students : List["StudentBase"]
    specialization : "SpecializationBase"
    disciplines : List["DisciplineBase"]
    class Config:
        orm_mode = True
class SpecializationBase(BaseModel):
    id : int
    name : str
    faculty_id : int

class Specialization(SpecializationBase):
    groups : "GroupBase"
    faculty : "FacultyBase"
    class Config:
        orm_mode = True
class FacultyBase(BaseModel):
    id : int
    name : str

class Faculty(FacultyBase):
    specializations : List[SpecializationBase]
    class Config:
        orm_mode = True

class DisciplineBase(BaseModel):
    id : int
    name : str

class Discipline(DisciplineBase):
    groups : List["GroupBase"]
    laboratories : List["LaboratoryBase"]
    class Config:
        orm_mode = True
class LaboratoryBase(BaseModel):
    id : int
    name : str
    description : str
    discipline_id : int

class Laboratory(LaboratoryBase):
    discipline : "DisciplineBase"
    files : List["FileLaboratoryBase"]
    class Config:
        orm_mode = True


class FileLaboratoryBase(BaseModel):
    id : int
    file_id : int
    laboratory_id : int
    date_of_create : date
    author : str

class FileLaboratory(FileLaboratoryBase):
    file : "FileBase"
    laboratory : "LaboratoryBase"
    class Config:
        orm_mode = True
class FileBase(BaseModel):
    name : str
    url : str

class File(FileBase):
    laboratories : List["FileLaboratoryBase"]
    class Config:
        orm_mode = True




