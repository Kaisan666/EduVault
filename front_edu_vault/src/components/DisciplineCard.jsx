import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/DisciplineCard.module.css';
import icon from '../images/icon.png';
import axios from 'axios';



const DisciplineCard = ({ title, id, userData }) => {
  const supportedFileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']; // MIME-типы
  const supportedExtensions = ['.xlsx', '.xls', '.pdf', '.docx', '.txt'];
  const [disciplineData, setDisciplineData] = useState(null);
  const [newLabName, setNewLabName] = useState('');
  const [editingLabIndex, setEditingLabIndex] = useState(null);
  const [editedLabName, setEditedLabName] = useState('');
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Fetch files from the server
  async function fetchFiles() {
    try {
      const response = await axios.get(`http://localhost:5000/api/file/show-all/${id}`);
      const files = response.data; // Сервер возвращает объект
      console.log("ГОВНО", response.data)
      if (Array.isArray(files)) {
        setFileList(files); // Если это массив, установим его напрямую
      } else if (response.data.length === 0){
        setFileList(null)
      }
      else {
        setFileList([files]); // Если объект, оборачиваем в массив
      }
      console.log("Хуй", fileList)
    } catch (error) {
      console.error('Error fetching files:', error);
      setFileList([]); // Очистим список файлов при ошибке
    }
  }
  

  // Simulated lab data loading (replace with actual data fetching in real app)
  useEffect(() => {
    fetchFiles();
  }, []);

  // Add a new lab
  const handleAddLab = () => {
    if (newLabName.trim()) {
      const newLab = { name: newLabName };
      setDisciplineData(prevData => ({
        ...prevData,
        labs: [...prevData.labs, newLab]
      }));
      setNewLabName(''); // Clear the input field
    }
  };

  // Edit an existing lab
  const handleEditLab = (index) => {
    setEditingLabIndex(index);
    setEditedLabName(disciplineData.labs[index].name);
  };

  // Save edited lab name
  const handleSaveEdit = () => {
    if (editedLabName.trim()) {
      const updatedLabs = [...disciplineData.labs];
      updatedLabs[editingLabIndex].name = editedLabName;
      setDisciplineData(prevData => ({
        ...prevData,
        labs: updatedLabs
      }));
      setEditingLabIndex(null); // Close edit mode
      setEditedLabName(''); // Clear the input field
    }
  };

  // Delete a lab
  const handleDeleteLab = (index) => {
    const updatedLabs = disciplineData.labs.filter((_, i) => i !== index);
    setDisciplineData(prevData => ({
      ...prevData,
      labs: updatedLabs
    }));
  };

  // Handle file selection for uploading
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle form submission for file upload
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    if (!file) {
      setUploadMessage('Пожалуйста, выберите файл для загрузки.');
      return;
    }
  
    if (!supportedFileTypes.includes(file.type)) {
      setUploadMessage('Файл неподдерживаемого формата. Допустимы: Excel, PDF, Word, TXT.');
      return;
    }
  
    if (!newLabName.trim()) {
      setUploadMessage('Введите название файла.');
      return;
    }
  
    // Получаем расширение файла
    const fileExtension = supportedExtensions.find((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );
  
    if (!fileExtension) {
      setUploadMessage('Файл должен быть в формате Excel, PDF, Word или TXT.');
      return;
    }
  
    // Добавляем расширение к названию файла
    const newFileName = newLabName.trim() + fileExtension;
  
    setIsUploading(true);
    setUploadMessage('Загружаем файл...');
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('newFileName', newFileName);
  
    try {
      const response = await axios.post(`http://localhost:5000/api/file/upload-file/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        setUploadMessage('Файл успешно загружен!');
        setFile(null);
        setNewLabName('');
        fetchFiles(); // Обновляем список файлов после успешной загрузки
      } else {
        setUploadMessage('Ошибка при загрузке файла.');
      }
    } catch (error) {
      setUploadMessage('Ошибка при загрузке файла.');
    } finally {
      setIsUploading(false);
    }
  };

  // Loading state before the data is available
  // if (!disciplineData) {
  //   return <div>Загрузка...</div>;
  // }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.greenSquare}>
          <span className={styles.disciplineName}>{title}</span>
        </div>
      </div>
      {(userData.userRole === 'Староста' || userData.userRole === 'Преподаватель' || userData.userRole === 'Секретарь' || userData.userRole === 'Админ') && (
        <form className={styles.uploadForm} onSubmit={handleFormSubmit}>
        <h3>Загрузить файл</h3>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx,.xls,.pdf,.docx,.txt" // Ограничение на уровне браузера
          disabled={isUploading}
        />
        <input
          type="text"
          value={newLabName}
          onChange={(e) => setNewLabName(e.target.value)}
          placeholder="Введите название файла (без расширения)"
          className={styles.inputField}
        />
        <button
          type="submit"
          disabled={isUploading || !file}
          className={styles.button}
        >
          {isUploading ? 'Загрузка...' : 'Загрузить файл'}
        </button>
        {uploadMessage && <p>{uploadMessage}</p>}
      </form>
      )}

      <ul className={styles.labList}>
        {fileList && fileList.length > 0 ? (
          fileList.map(file => (
            <li key={`${file.id}-${file.name}`} className={styles.labItem}>
              <span>{file.name}</span>
              <Link to={`/lab/${file.id}`}>
                <img src={icon} alt="file icon" className={styles.fileIcon} />
              </Link>
              {(userData.userRole === 'Староста' || userData.userRole === 'Преподаватель' || userData.userRole === 'Секретарь' || userData.userRole === 'Админ') && (
                <div className={styles.labActions}>
                  <button onClick={() => handleEditLab(file.id)} className={styles.button}>
                    Редактировать
                  </button>
                  <button onClick={() => handleDeleteLab(file.id)} className={styles.button}>
                    Удалить
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className={styles.labItem}>Файлы отсутствуют</li>
        )}
      </ul>
    </div>
  );
};

export default DisciplineCard;
