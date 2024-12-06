import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import styles from '../styles/header.module.css'; 
 
import userIcon from '../images/user.png'; 

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                   
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
