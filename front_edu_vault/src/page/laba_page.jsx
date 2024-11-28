import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Импортируем useParams для получения параметров из URL
import Header from '../components/header';
import LabWorkCard from '../components/laba';
import Footer from '../components/footer ';

const LabPage = () => {
  const { disciplineId } = useParams(); // Получаем параметр disciplineId из URL
  const [labWorks, setLabWorks] = useState([]);

  useEffect(() => {
    // Параметр disciplineId можно использовать для фильтрации данных или как часть URL
    fetch(`http://localhost:3001/labs?disciplineId=${disciplineId}`)
      .then((response) => response.json())
      .then((data) => setLabWorks(data))
      .catch((error) => console.error('Ошибка загрузки лабораторных работ:', error));
  }, [disciplineId]); // Если disciplineId изменится, перезапустится запрос

  return (
    <div>
      <Header /> 
      <div className="labwork-container">
        {labWorks.length > 0 ? (
          labWorks.map((lab) => (
            <LabWorkCard
              key={lab.id}
              labId={lab.id}
              labTitle={lab.labTitle}
              pdfUrl={lab.pdfUrl}
              description={lab.description}
              deadline={lab.deadline}
              reportUrl={lab.reportUrl}
            />
          ))
        ) : (
          <p>Загружаем лабораторные работы...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LabPage;
