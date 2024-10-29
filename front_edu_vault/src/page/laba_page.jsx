import React from 'react';
import Header from '../components/header';
import LabWorkCard from '../components/laba';
import Footer from '../components/footer '; // Убедитесь, что здесь нет лишнего пробела
const LabPage = () => {
    // Пример данных для лабораторных работ
    const labWorks = [
      {
        id: 1,
        title: 'Лабораторная работа по физике',
        pdfUrl: 'file:///C:/Users/daraz/Downloads/Laboratornaya_rabota_1.pdf',
      },
    ];
  
    return (
      <div>
        <Header />
        <div className="labwork-container">
          {labWorks.map((lab) => (
            <LabWorkCard key={lab.id} labId={lab.id} labTitle={lab.title} pdfUrl={lab.pdfUrl} />
          ))}
        </div>
        <Footer />
      </div>
    );
  };
  
  export default LabPage;
  