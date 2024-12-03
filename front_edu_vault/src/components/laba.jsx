import React from 'react';
import '../styles/laba.css';

const LabWorkCard = ({ labId, labTitle, pdfUrl, description, deadline, reportUrl }) => {
  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      console.error('PDF URL not provided');
    }
  };

  return (
    <div className="labwork-card">
      <div className="header">
        <button className="download-button" onClick={handleDownload}>
          Скачать
        </button>
        <h2 className="lab-title">Лабораторная работа ID: {labId || 'Не задан'}</h2>
      </div>
      <div className="description">
        <p>{description || 'Описание не доступно'}</p>
      </div>
      <div className="deadline">
        <span>
          Дедлайн: {deadline ? new Date(deadline).toLocaleDateString() : 'Не задан'}
        </span>
      </div>
      <div className="pdf-container">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            width="100%"
            height="500px"
            title={`Лабораторная работа ${labId}`}
          />
        ) : (
          <p>PDF не найден</p>
        )}
      </div>
      {reportUrl && (
        <div className="report">
          <a href={reportUrl} target="_blank" rel="noopener noreferrer">Обратный отсчет</a>
        </div>
      )}
    </div>
  );
};

export default LabWorkCard;
