import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/FacultyBanner.module.css';
import { useParams } from 'react-router-dom';

const FacultyBanner = () => {
  const { facultyId } = useParams();
  const [faculty, setFaculty] = useState("");

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/faculty/${facultyId}`,
          {
            withCredentials: true
          }
        );
        const data = response.data;
        setFaculty(data.name);
      } catch (error) {
        console.error('Ошибка при получении информации о факультете:', error);
      }
    };

    fetchFaculty();
  }, [facultyId]);

  return (
    <div className={styles.facultyBanner}>
      <span>{faculty}</span>
      {/* <button onClick={handleLogout} className={styles.logoutButton}>
        Выйти
      </button> */}
    </div>
  );
};

export default FacultyBanner;