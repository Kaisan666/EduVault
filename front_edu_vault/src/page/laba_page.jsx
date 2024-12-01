import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Импортируем useParams для получения параметров из URL и useNavigate для навигации
import Header from '../components/header';
import LabWorkCard from '../components/laba';
import Footer from '../components/footer ';

const LabPage = () => {
  const { disciplineId } = useParams(); // Получаем параметр disciplineId из URL
  const [labWorks, setLabWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Состояние для загрузки
  const [error, setError] = useState(null);  // Состояние для ошибок
  const navigate = useNavigate(); // Хук для навигации назад

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Заменяем реальный запрос на фейковые данные
    const fakeData = [
      {
        id: 1,
        labTitle: 'Лабораторная работа 1',
        pdfUrl: 'https://example.com/lab1.pdf',
        description: 'Описание лабораторной работы 1',
        deadline: '2024-12-31T23:59:59Z',
        reportUrl: 'https://example.com/report1.pdf',
      },
      {
        id: 2,
        labTitle: 'Лабораторная работа 2',
        pdfUrl: 'https://example.com/lab2.pdf',
        description: 'Описание лабораторной работы 2',
        deadline: '2024-12-15T23:59:59Z',
        reportUrl: 'https://example.com/report2.pdf',
      },
    ];

    // Имитация загрузки данных с сервера
    setTimeout(() => {
      setLabWorks(fakeData);
      setIsLoading(false);
    }, 1000); // Подождем 1 секунду, чтобы симулировать задержку загрузки

  }, [disciplineId]); // Если disciplineId изменится, перезапустится запрос

  const handleBackClick = () => {
    navigate(-1); // Переходит на предыдущую страницу
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <p>Загружаем лабораторные работы...</p>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <p style={{ color: 'red' }}>Ошибка загрузки: {error}</p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="labwork-container">
        {/* Стрелка назад */}
        <button onClick={handleBackClick} className="back-button">
          ← Назад
        </button>

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
          <p>Лабораторные работы не найдены для данной дисциплины.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LabPage;
