import React from 'react';
import '../styles/laba.css'; // Импорт стилей

const LabWorkCard = ({ labId, labTitle, pdfUrl }) => {
  const handleDownload = () => {
    // Логика для скачивания PDF
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="labwork-card">
      <div className="header">
        <button className="download-button" onClick={handleDownload}>
          Скачать
        </button>
        <h2 className="lab-title">Лабораторная работа ID: {labId}</h2>
      </div>
      <div className="pdf-container">
        <iframe
          src={pdfUrl}
          width="100%"
          height="500px"
        />
      </div>
    </div>
  );
};

export default LabWorkCard;
