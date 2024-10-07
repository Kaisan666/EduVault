import React from 'react';
import styles from '../styles/header.module.css'; 
import logo from '../images/logo.png';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Логотип" className={styles.logo} />
                <span className={styles.brandName}>EduVault</span> 
            </div>
            <nav>
                
            </nav>
            <button className={styles.logoutButton}>Выйти</button>
        </header>
    );
};

export default Header;
