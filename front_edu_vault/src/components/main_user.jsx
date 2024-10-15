import React from 'react';
import styles from '../styles/main_user.module.css'; 
import Header from './header';
import Footer from './footer ';

const disciplines = [
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ',
    'ПРОГРАММНАЯ ИНЖЕНЕРИЯ'
];

const DisciplineList = () => {
    const visibleDisciplines = disciplines.length; // Показываем все дисциплины

    return (
       
          
            <div className={styles.disciplineContainer}>
                <h2>id факультета + поток(группы)</h2>
                <h3 className={styles.lab}>ЛАБОРАТОРНЫЕ РАБОТЫ</h3>
                <div className={styles.disciplineBox}>
                    {disciplines.slice(0, visibleDisciplines).map((discipline, index) => (
                        <div key={discipline} className={styles.disciplineItem}> {/* Используем discipline как ключ */}
                            {discipline}
                        </div>
                    ))}
                </div>
            </div>
          
    );
};

export default DisciplineList;
