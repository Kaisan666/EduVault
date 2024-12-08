import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import DisciplineCard from '../components/DisciplineCard';
import Footer from '../components/footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from "./inputForm.module.css"

const LabWorksPage = () => {
  const { disciplineId } = useParams();
  const [labName, setLabName] = useState("");
  const [labs, setLabs] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [userData, setUserData] = useState(null);

  async function fetchUserInfo() {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/auth`, { withCredentials: true });
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUserInfo();
    }
  }, [userData]);

  const handleBackClick = () => {
    window.history.back(); // Возвращает на предыдущую страницу
  };
  async function fetchLabs() {
    const response = await axios.get(`http://localhost:5000/api/laboratory/show-all/${disciplineId}`, {withCredentials : true})
    setLabs(response.data)
    console.log(response.data)
  }
  useEffect(() =>{
    fetchLabs()
  }, [])

  const handleAddLab = async () => {
    if (labName.trim()) {
      try {
        const response = await axios.post(`http://localhost:5000/api/laboratory/create-laboratory/${disciplineId}`, { name: labName }, { withCredentials: true });
        console.log(response.data)
        setLabs([...labs, response.data]);
        setLabName("");
        setIsAdding(false);
      } catch (error) {
        console.error('Error adding lab:', error);
      }
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };
console.log(labs)
  return (
    <div className="app">
      <Header />
      <main style={{display : "flex", flexDirection : "column"}}>
        {isAdding ? (
          <div>
            <form
            
            className={styles.inputForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleAddLab();
              }}
            >
              <input
              className={styles.inputField}
                type="text"
                placeholder="Введите название/номер лабораторной работы"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
              />
              <button type="submit" style={{width : "300px"}}>Добавить</button>
            </form>
          </div>
        ) : (
          <button onClick={handleAddClick} style={{margin : "0 auto"}}>
            + Добавить лабораторную работу
          </button>
        )}
        <div className="labwork-list">
          {/* Стрелка назад */}
          <button onClick={handleBackClick} className="back-button">
            ← Назад
          </button>

          {/* Проходим по массиву labs и отображаем компоненты DisciplineCard */}
          {labs.length > 0 ? (
            labs.map((lab) => (
              <DisciplineCard userData={userData} key={lab.id} title={lab.name} id = {lab.id}/>
            ))
          ) : (
            <p>Нет доступных лабораторных работ</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LabWorksPage;
