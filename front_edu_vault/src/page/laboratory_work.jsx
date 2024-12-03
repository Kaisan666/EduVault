import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import DisciplineCard from '../components/DisciplineCard';
import Footer from '../components/footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LabWorksPage = () => {
  const { disciplineId } = useParams();
  const [labName, setLabName] = useState("");
  const [labs, setLabs] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

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

  return (
    <div className="app">
      <Header />
      <main>
        {isAdding ? (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddLab();
              }}
            >
              <input
                type="text"
                placeholder="Введите название/номер лабораторной работы"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
              />
              <button type="submit">Добавить</button>
            </form>
          </div>
        ) : (
          <button onClick={handleAddClick} className="add-button">
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
              <DisciplineCard key={lab.id} title={lab.name} id = {lab.id}/>
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
