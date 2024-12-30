// src/components/Navbar.js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaPlus, FaChartBar } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" legacyBehavior>
            <a className={`${styles.navLink} ${router.pathname === '/' ? styles.active : ''}`}>
              <FaHome className={styles.icon} />
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/add-entry" legacyBehavior>
            <a className={`${styles.navLink} ${router.pathname === '/add-entry' ? styles.active : ''}`}>
              <FaPlus className={styles.icon} />
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/Statistics" legacyBehavior>
            <a className={`${styles.navLink} ${router.pathname === '/Statistics' ? styles.active : ''}`}>
              <FaChartBar className={styles.icon} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;