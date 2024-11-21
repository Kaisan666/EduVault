import React, { useEffect, useState } from 'react';
import styles from '../styles/Secretary_Direction_Main.module.css';


const Secretary_Direction_Main = () => {
    const [posts, setPosts] = useState([]); // Состояние для хранения постов
  
    useEffect(() => {
      // Функция для получения постов из API
      const fetchPosts = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Запрос к фейковому API
          const data = await response.json();
          setPosts(data); // Сохранение данных в состоянии
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      fetchPosts(); // Вызов функции при монтировании компонента
    }, []); // Пустой массив зависимостей, чтобы запрос выполнялся только один раз
  
    return (
      <div className={styles.container}>
        <h2 className={styles.title}></h2>
        <div className={styles.grid}>
          {posts.map((post) => (
            <div key={post.id} className={styles.card}> {/* Используем id для уникальности */}
              ID: {post.id}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Secretary_Direction_Main;
