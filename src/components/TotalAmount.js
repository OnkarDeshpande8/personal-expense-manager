// src/components/TotalAmount.js
import React from 'react';
import styles from './TotalAmount.module.css';

const TotalAmount = ({ amount }) => {
  return (
    <div className={styles.totalAmount}>
      <h2>Total Amount: {amount}</h2>
    </div>
  );
};

export default TotalAmount;