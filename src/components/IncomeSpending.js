import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import styles from "./IncomeSpending.module.css";

const IncomeSpending = ({ totalIncome, totalSpending }) => {
  return (
    <div className={styles.totalContainer}>
      <div className={styles.totalSubContainer}>
        <div className={styles.total}>Income</div>
        <div className={styles.totalIncome}>
          <div>{totalIncome}</div>
          <FaRupeeSign style={{ marginTop: 3, fontSize: 17 }} />
        </div>
      </div>
      <div className={styles.totalSubContainer}>
        <div className={styles.total}>Spending</div>
        <div className={styles.totalSpending}>
          <div>{totalSpending}</div>
          <FaRupeeSign style={{ marginTop: 3, fontSize: 17 }} />
        </div>
      </div>
    </div>
  );
};

export default IncomeSpending;
