import React from 'react';
import Header from '../components/header';
import DisciplineCard from '../components/DisciplineCard';
import Footer from '../components/footer ';

// Пример фейковых данных лабораторных работ
const labWorks = [
  { id: 1, title: 'Программирование на Python' },
  { id: 2, title: 'Алгоритмы и структуры данных' },
  { id: 3, title: 'Сетевые технологии' },
  { id: 4, title: 'Машинное обучение' },
];

const LabWorksPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <div className="labwork-list">
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
