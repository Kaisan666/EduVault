from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
class Person(Base):
    __tablename__ = 'persons'

    id = Column(Integer, primary_key=True)
    lastName = Column(String(256))
    firstName = Column(String(256))
    patronymic = Column(String(256), nullable = True)
    email = Column(String(256))
    phoneNumber = Column(String(15))

    student_id = Column(Integer, ForeignKey('students.id'), unique=True, nullable=True)
    lecturer_id = Column(Integer, ForeignKey('lecturers.id'), unique=True, nullable=True)

    student = relationship("Student", back_populates="person")
    lecturer = relationship("Lecturer", back_populates="person")
    user = relationship("User", back_populates="person")

class Student(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True)
    group_id = Column(Integer, ForeignKey('groups.id'))
    course = Column(Integer)

    person = relationship("Person", back_populates="student")

    group = relationship("Group", back_populates="students")

association_table_discipline_group = Table("discipline_group", Base.metadata,
Column("group_id", Integer, ForeignKey('groups.id')),
        Column('discipline_id', Integer, ForeignKey('disciplines.id')))


class Group(Base):
    __tablename__ = 'groups'
    id = Column(Integer, primary_key=True)
    groupNumber = Column(Integer)
    specialization_id = Column(Integer, ForeignKey("specializations.id"))
    students = relationship("Student", back_populates="group" )
    specialization = relationship("Specialization", back_populates="groups")
    disciplines = relationship("Discipline", secondary=association_table_discipline_group, back_populates="groups")
class Specialization(Base):
    __tablename__ = "specializations"
    id = Column(Integer, primary_key=True)
    name = Column(String(512))
    faculty_id = Column(Integer, ForeignKey("faculties.id"))
    groups = relationship("Group", back_populates="specialization")
    faculty = relationship("Faculty", back_populates="specializations")
class Faculty(Base):
    __tablename__ = "faculties"
    id = Column(Integer, primary_key=True)
    name = Column(String(512))

    specializations = relationship("Specialization", back_populates="faculty")

class Lecturer(Base):
    __tablename__ = "lecturers"

    id = Column(Integer, primary_key=True)
    department_id = Column(Integer, ForeignKey("departments.id"))

    person = relationship("Person", back_populates="lecturer")
    department = relationship("Department", back_populates="lecturers")
class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True)
    name = Column(String(256))

    lecturers = relationship("Lecturer",back_populates="department" )

association_table_roles_users = Table('role_user', Base.metadata,
Column('user_id', Integer, ForeignKey('users.id')),
Column('role_id', Integer, ForeignKey('roles.id'))
)
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    login = Column(String(128))
    password = Column(String(256))
    person_id = Column(Integer, ForeignKey("persons.id"), unique=True)

    person = relationship("Person", back_populates="user")
    roles = relationship("Role", secondary=association_table_roles_users, back_populates="users")


association_table_roles_permissions = Table("role_permission", Base.metadata,
Column("role_id", Integer, ForeignKey('roles.id')),
      Column("permission_id", Integer, ForeignKey('permissions.id')))

class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    code = Column(Integer)

    users = relationship('User', secondary=association_table_roles_users, back_populates="roles" )
    permissions = relationship('Permission', secondary=association_table_roles_permissions, back_populates="roles")

class Permission(Base):
    __tablename__ = "permissions"
    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    code = Column(Integer)

    roles = relationship("Role", secondary=association_table_roles_permissions, back_populates="permissions")



class Discipline(Base):
    __tablename__ = "disciplines"
    id = Column(Integer, primary_key=True)
    name = Column(String(256))

    laboratories = relationship("Laboratory", back_populates="discipline")

association_table_file_laboratory = Table("file_laboratory", Base.metadata,
        Column("file_id", Integer, ForeignKey("files.id")),
        Column("laboratory_id", Integer, ForeignKey("laboratories.id")))

class Laboratory(Base):
    __tablename__ = "laboratories"
    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    description = Column(String(512))
    discipline_id = Column(Integer, ForeignKey('disciplines.id'))

    discipline = relationship("Discipline", back_populates="laboratories")
    files = relationship("File", secondary=association_table_file_laboratory, back_populates="laboratory")

class File(Base):
    __tablename__= "files"
    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    url = Column(String(2048))




