import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import styles from '../styles/header.module.css'; 
import logo from '../images/logo.png'; 
import headerImage from '../images/header.png'; 
import userIcon from '../images/user.png'; 

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img 
                    src={headerImage} 
                    alt="Заголовочное изображение" 
                    className={styles.headerImage} 
                />
                <div className={styles.logoContainer}>
                    <img 
                        src={logo} 
                        alt="Логотип" 
                        className={styles.logo} 
                    />
                    <span className={styles.brandName}>EduVault</span>
                </div>
                <div className={styles.logoutButton}>
                    <Link to="/PersonalCabinet"> {/* Переход на страницу личного кабинета */}
                        <img 
                            src={userIcon} 
                            alt="Личный кабинет" 
                            className={styles.userIcon} 
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
