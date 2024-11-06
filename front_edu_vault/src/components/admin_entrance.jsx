import React, { useState, useEffect } from 'react';
import styles from '../styles/admin_entrance.module.css';
import logo from '../images/logo_entrance.png';

const LoginFormAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [faculty, setFaculty] = useState('');
  const [direction, setDirection] = useState('');
  const [group, setGroup] = useState('');
  const [student, setStudent] = useState(''); 
  const [faculties, setFaculties] = useState([]);
  const [directions, setDirections] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const facultyResponse = await fetch('/api/faculties');
      if (!facultyResponse.ok) throw new Error('Не удалось загрузить факультеты');
      const facultyData = await facultyResponse.json();
      setFaculties(facultyData);

      if (faculty) {
        const directionResponse = await fetch(`/api/directions?faculty=${faculty}`);
        if (!directionResponse.ok) throw new Error('Не удалось загрузить направления');
        const directionData = await directionResponse.json();
        setDirections(directionData);

        const groupResponse = await fetch(`/api/groups?faculty=${faculty}&direction=${direction}`);
        if (!groupResponse.ok) throw new Error('Не удалось загрузить группы');
        const groupData = await groupResponse.json();
        setGroups(groupData);
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка при загрузке данных');
    }
  };

  useEffect(() => {
    fetchData();
  }, [faculty, direction]); 

  useEffect(() => {
  
    const fetchStudents = async () => {
      try {
        if (group) {
          const studentResponse = await fetch(`/api/students?group=${group}`);
          if (!studentResponse.ok) throw new Error('Не удалось загрузить студентов');
          const studentData = await studentResponse.json();
          setStudents(studentData);
        }
      } catch (err) {
        console.error(err);
        setError('Ошибка при загрузке студентов');
      }
    };

    fetchStudents();
  }, [group]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, faculty, direction, group, student }), // Добавляем студента
      });

      if (!response.ok) {
        throw new Error('Ошибка входа. Проверьте ваши данные.');
      }
      alert('Вход выполнен успешно!');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <img src={logo} alt="Логотип" className={styles.logo} />
        {error && <p className={styles.error}>{error}</p>}

        <div>
          <label htmlFor="faculty"></label>
          <select
            id="faculty"
            value={faculty}
            onChange={(e) => {
              setFaculty(e.target.value);
              setDirection('');
              setGroup('');
              setStudent(''); 
            }}
            className={styles.inputField}
          >
            <option value="">Выберите факультет</option>
            {faculties.map((fac) => (
              <option key={fac.id} value={fac.id}>{fac.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="direction"></label>
          <select
            id="direction"
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value);
              setGroup('');
              setStudent('');
            }}
            className={styles.inputField}
          >
            <option value="">Выберите направление</option>
            {directions.map((dir) => (
              <option key={dir.id} value={dir.id}>{dir.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="group"></label>
          <select
            id="group"
            value={group}
            onChange={(e) => {
              setGroup(e.target.value);
              setStudent('');
            }}
            className={styles.inputField}
          >
            <option value="">Выберите группу</option>
            {groups.map((grp) => (
              <option key={grp.id} value={grp.id}>{grp.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="student"></label>
          <select
            id="student"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            className={styles.inputField}
          >
            <option value="">ФИО</option>
            {students.map((stu) => (
              <option key={stu.id} value={stu.id}>{stu.fullName}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputField}
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Загрузка...' : 'Зарегистрировать'}
        </button>
      </form>
    </div>
  );
};

export default LoginFormAdmin;
