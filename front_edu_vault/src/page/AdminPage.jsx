
// import React from 'react';
// import '../styles/laba.css';

// const LabWorkCard = ({ labId, labTitle, pdfUrl, description, deadline, reportUrl }) => {
//   const handleDownload = () => {
//     window.open(pdfUrl, '_blank');
//   };

//   const renderDeadline = () => {
//     if (deadline) {
//       return <span>Дедлайн: {new Date(deadline).toLocaleDateString()}</span>;
//     } else {
//       return <span>Время сдачи не установлено</span>;
//     }
//   };

//   return (
//     <div className="labwork-card">
//       <div className="header">
//         <button className="download-button" onClick={handleDownload}>
//           Скачать
//         </button>
//         <h2 className="lab-title">Лабораторная работа ID: {labId}</h2>
//       </div>
//       <div className="description">
//         <p>{description}</p>
//       </div>
//       <div className="deadline">
//         {renderDeadline()}
//       </div>
//       <div className="pdf-container">
//         <iframe
//           src={pdfUrl}
//           width="100%"
//           height="500px"
//           title={`Лабораторная работа ${labId}`}
//         />
//       </div>
//       {reportUrl && (
//         <div className="report">
//           <a href={reportUrl} target="_blank" rel="noopener noreferrer">Обратный отчет</a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabWorkCard;
