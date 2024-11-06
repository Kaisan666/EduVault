import React from 'react';
import styles from '../styles/header.module.css'; 
import logo from '../images/logo.png'; 
import headerImage from '../images/header.png'; 
import userIcon from '../images/user.png'; 

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img src={headerImage} alt="Заголовочное изображение" className={styles.headerImage} />
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Логотип" className={styles.logo} />
                    <span className={styles.brandName}>EduVault</span> 
                </div>
                <button className={styles.logoutButton}>
                    <img src={userIcon} alt="Выйти" className={styles.userIcon} />
                </button>
            </div>
        </header>
    );
};
export default Header;
