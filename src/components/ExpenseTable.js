// components/ExpenseTable.js
import React from 'react';
import styles from './ExpenseTable.module.css';

const ExpenseTable = ({ expenses }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Date</th>
          <th className={styles.th}>Description</th>
          <th className={styles.th}>Amount</th>
          <th className={styles.th}>Category</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td className={styles.td}>{expense.date}</td>
            <td className={styles.td}>{expense.description}</td>
            <td className={styles.td}>{expense.amount}</td>
            <td className={styles.td}>{expense.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;