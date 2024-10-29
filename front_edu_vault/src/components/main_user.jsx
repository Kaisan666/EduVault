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
    const visibleDisciplines = disciplines.length; 

    return (
       <>
       
          <Header/>
            <div className={styles.disciplineContainer}>
                <h2>ПРИКЛАДНАЯ ИНФОРМАТИКА ПИ2201-04</h2>
                <h3 className={styles.lab}>ЛАБОРАТОРНЫЕ РАБОТЫ</h3>
                <div className={styles.disciplineBox}>
                    
                    {disciplines.slice(0, visibleDisciplines).map((discipline, index) => (
                        <div key={discipline} className={styles.disciplineItem}> {}
                            {discipline}
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
            </>
    );
};

export default DisciplineList;
