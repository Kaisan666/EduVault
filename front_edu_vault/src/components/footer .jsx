import React from 'react';
import styles from '../styles/footer.module.css';
import logo from '../images/logo_footer.png'; 

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Логотип" className={styles.logo} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
