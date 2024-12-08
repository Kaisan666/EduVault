import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Импортируем Link
import styles from '../styles/header.module.css';

import userIcon from '../images/user.png';
import { useAuth } from '../context/authContext';

const Header = () => {
    const { logout, isAuthenticated, userRole, userId } = useAuth();
    const navigate = useNavigate()
    const handleLogout = () =>{
        logout()
        navigate('/')
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <span className={styles.brandName}>EduVault</span>
                </div>
                <div className={styles.logoutButton}>
                        <>
                            <Link to={`/PersonalCabinet/${userId}`}>
                                <img
                                    src={userIcon}
                                    alt="Личный кабинет"
                                    className={styles.userIcon}
                                />
                            </Link>
                            <button style={{marginLeft : "15px"}} onClick={handleLogout}>Выйти</button>
                        </>
                </div>
            </div>
        </header>
    );
};

export default Header;
