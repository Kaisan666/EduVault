from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

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

    student = relationship("Student", back_populates="person" )
    lecturer = relationship("Lecturer", back_populates="person")

class Student(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True)
    group_id = Column(Integer, ForeignKey('groups.id'))
    course = Column(Integer)

    person = relationship("Person", back_populates="student")

    group = relationship("Group", back_populates="students")

class Group(Base):
    __tablename__ = 'groups'
    id = Column(Integer, primary_key=True)
    groupNumber = Column(Integer)
    specialization_id = Column(Integer, ForeignKey("specializations.id"))
    students = relationship("Student", back_populates="group" )
    specialization = relationship("Specialization", back_populates="groups")

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



