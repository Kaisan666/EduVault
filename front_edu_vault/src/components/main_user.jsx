import React from 'react';
import styles from '../styles/main_user.module.css'; 

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
    const visibleDisciplines = disciplines.length; 

    return (
       <>
            <div className={styles.disciplineContainer}>
                <h2 className={styles.lab}>ФАКУЛЬТЕТ ПРИКЛАДНОЙ ИНФОРМАТИКИ ПИ2201-04</h2>
                <h2 className={styles.lab}>ЛАБОРАТОРНЫЕ РАБОТЫ</h2>
                <div className={styles.disciplineBox}>
                    
                    {disciplines.slice(0, visibleDisciplines).map((discipline, index) => (
                        <div key={discipline} className={styles.disciplineItem}> {}
                            {discipline}
                        </div>
                    ))}
                </div>
            </div>
            </>
    );
};

export default DisciplineList;
