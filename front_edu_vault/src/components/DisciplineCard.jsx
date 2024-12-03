import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing to lab detail page
import styles from '../styles/DisciplineCard.module.css'; // Your CSS module file
import icon from '../images/icon.png'; // Your file icon image

const DisciplineCard = ({title, id}) => {
  const [disciplineData, setDisciplineData] = useState(null);
  const [newLabName, setNewLabName] = useState('');
  const [editingLabIndex, setEditingLabIndex] = useState(null);
  const [editedLabName, setEditedLabName] = useState('');
  const [file, setFile] = useState(null); // For the selected file
  const [isUploading, setIsUploading] = useState(false); // Track upload progress
  const [uploadMessage, setUploadMessage] = useState(''); // Upload progress message

  // Simulating user role, in a real app, you should get this from authentication context
  const userRole = 'starosta'; // Example user role (could be 'starosta', 'professor', or 'secretary')

  // Simulated lab data loading (replace with actual data fetching in real app)
  useEffect(() => {
    const data = {
      id: 1,
      name: 'Программирование на Python',
      labs: [
        { name: 'Лабораторная работа 1' },
        { name: 'Лабораторная работа 2' }
      ]
    };
    setDisciplineData(data);
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

  // Handle file upload
  const handleFileUpload = () => {
    if (!file) {
      setUploadMessage('Пожалуйста, выберите файл для загрузки.');
      return;
    }

    setIsUploading(true);
    setUploadMessage('Загружаем файл...');

    // Simulate file upload process (replace with actual file upload logic)
    setTimeout(() => {
      setIsUploading(false);
      setUploadMessage('Файл успешно загружен!');
      setFile(null); // Clear selected file after upload
    }, 2000);
  };

  // Loading state before the data is available
  if (!disciplineData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.greenSquare}>
          <span className={styles.disciplineName}>{title}</span>
          <span className={styles.disciplineId}>ID: {disciplineData.id}</span>
        </div>
      </div>

      {/* Add lab section visible for roles starosta, professor, and secretary */}
      {(userRole === 'starosta' || userRole === 'professor' || userRole === 'secretary') && (
        <div className={styles.addLabForm}>
        </div>
      )}

      {/* File upload form visible for roles starosta, professor, and secretary */}
      {(userRole === 'starosta' || userRole === 'professor' || userRole === 'secretary') && (
        <div className={styles.uploadForm}>
          <h3>Загрузить лабораторную работу</h3>
          <input 
            type="file" 
            onChange={handleFileChange} 
            disabled={isUploading} 
          />
          <button 
            onClick={handleFileUpload} 
            disabled={isUploading || !file}
            className={styles.button}
          >
            {isUploading ? 'Загрузка...' : 'Загрузить файл'}
          </button>
          {uploadMessage && <p>{uploadMessage}</p>}
        </div>
      )}

      {/* List of labs */}
      <ul className={styles.labList}>
        {disciplineData.labs.map((lab, index) => (
          <li key={index} className={styles.labItem}>
            {editingLabIndex === index ? (
              <div className={styles.editForm}>
                <input 
                  type="text" 
                  value={editedLabName} 
                  onChange={(e) => setEditedLabName(e.target.value)} 
                  className={styles.inputField}
                />
                <button 
                  onClick={handleSaveEdit} 
                  className={styles.button}
                >
                  Сохранить
                </button>
                <button 
                  onClick={() => setEditingLabIndex(null)} 
                  className={styles.button}
                >
                  Отменить
                </button>
              </div>
            ) : (
              <>
                <span>{lab.name}</span>
                <Link to={`/lab/${disciplineData.id}`}>
                  <img src={icon} alt="file icon" className={styles.fileIcon} />
                </Link>                               
                {/* Edit and Delete buttons for authorized roles */}
                {(userRole === 'starosta' || userRole === 'professor' || userRole === 'secretary') && (
                  <div className={styles.labActions}>
                    <button 
                      onClick={() => handleEditLab(index)} 
                      className={styles.button}
                    >
                      Редактировать
                    </button>
                    <button 
                      onClick={() => handleDeleteLab(index)} 
                      className={styles.button}
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisciplineCard;
