import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import LabWorkCard from '../components/laba';
import Footer from '../components/footer ';

const LabPage = () => {
  const [labWorks, setLabWorks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/labs')
      .then((response) => response.json())
      .then((data) => setLabWorks(data))
      .catch((error) => console.error('Ошибка загрузки лабораторных работ:', error));
  }, []);

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
