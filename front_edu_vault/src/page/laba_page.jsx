import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Для работы с параметрами маршрута и навигацией
import axios from 'axios'; // Для HTTP-запросов

import Header from '../components/header'; // Компонент заголовка
import Footer from '../components/footer'; // Компонент подвала
import { renderAsync } from 'docx-preview';
import * as XLSX from 'xlsx';

const LabPage = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  const fetchFile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/file/show-one/${fileId}`);
      setFileData(response.data);
    } catch (err) {
      setError('Ошибка при загрузке файла.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/file/download-file/${fileId}`, {
        responseType: 'blob' // Убедитесь, что данные возвращаются в виде blob
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileData.name); // Устанавливаем имя файла для скачивания
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Ошибка при скачивании файла.');
    }
  };

  useEffect(() => {
    fetchFile();
  }, [fileId]); // Перезагрузка при изменении fileId

  // Функция для отображения превью файла
  const renderFilePreview = () => {
    if (!fileData) return <p>Файл отсутствует.</p>;

    const { name, data } = fileData;
    const mimeType = getMimeType(name);

    if (mimeType === 'application/pdf') {
      return (
        <iframe
          src={`data:application/pdf;base64,${btoa(
            new Uint8Array(data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          )}`}
          width="100%"
          height="600px"
          title="PDF Preview"
        />
      );
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const container = document.getElementById('docx-container');
      renderAsync(new Blob([new Uint8Array(data.data)]), container);
      return <div id="docx-container" />;
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const workbook = XLSX.read(new Uint8Array(data.data), { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_html(workbook.Sheets[sheetName]);
      return <div dangerouslySetInnerHTML={{ __html: sheet }} />;
    } else if (mimeType === 'text/plain') {
      return <pre>{new TextDecoder().decode(new Uint8Array(data.data))}</pre>;
    } else {
      return <p>Формат файла не поддерживается для предпросмотра.</p>;
    }
  };

  // Определение MIME-типа файла
  const getMimeType = (fileName) => {
    if (fileName.endsWith('.pdf')) return 'application/pdf';
    if (fileName.endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if (fileName.endsWith('.xlsx')) return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (fileName.endsWith('.txt')) return 'text/plain';
    return 'unknown';
  };

  const handleBackClick = () => {
    navigate(-1); // Возврат на предыдущую страницу
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <p>Загрузка файла...</p>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <p style={{ color: 'red' }}>{error}</p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="file-preview-container">
        <button onClick={handleBackClick} className="back-button">
          ← Назад
        </button>
        <button onClick={downloadFile}>Скачать</button>
        <h2>Предпросмотр файла</h2>
        {renderFilePreview()}
      </div>
      <Footer />
    </div>
  );
};

export default LabPage;
