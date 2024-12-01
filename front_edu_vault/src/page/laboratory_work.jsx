import React from 'react';
import Header from '../components/header';
import DisciplineCard from '../components/DisciplineCard';
import Footer from '../components/footer ';

// Пример фейковых данных лабораторных работ
const labWorks = [
  { id: 1, title: 'Программирование на Python' }
];

const LabWorksPage = () => {
  const handleBackClick = () => {
    window.history.back(); // Возвращает на предыдущую страницу
  };

  return (
    <div className="app">
      <Header />
      <main>
        <div className="labwork-list">
          {/* Стрелка назад */}
          <button onClick={handleBackClick} className="back-button">
            ← Назад
          </button>

          {/* Проходим по массиву labWorks и отображаем компоненты DisciplineCard */}
          {labWorks.length > 0 ? (
            labWorks.map(labWork => (
              <DisciplineCard
                key={labWork.id}
                title={labWork.title}
              />
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
