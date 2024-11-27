import React, { useEffect, useState } from 'react';
import styles from '../styles/Secretary_Direction_Main.module.css';

const Secretary_Direction_Main = () => {
  const [posts, setPosts] = useState([]); // Состояние для хранения постов
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
  const [error, setError] = useState(null); // Состояние для отслеживания ошибок

  useEffect(() => {
    // Функция для получения постов из API
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Запрос к фейковому API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data fetched:', data); // Логирование данных для проверки
        setPosts(data); // Сохранение данных в состоянии
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // Вызов функции при монтировании компонента
  }, []); // Пустой массив зависимостей, чтобы запрос выполнялся только один раз

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}></h2>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.card}> {/* Используем id для уникальности */}
            <h3> {post.id}</h3>
            <p><strong>Наименование</strong> {post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Secretary_Direction_Main;
