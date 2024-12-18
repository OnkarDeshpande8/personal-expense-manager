// components/TransactionList.js
import React from 'react';
import { TransactionType } from '../../utils/enums';
import { FaRupeeSign } from 'react-icons/fa';
import styles from './TransactionList.module.css';
import { formatAmount } from '../../utils/services';

const TransactionList = ({ transactions, onEdit }) => {
  return (
    <div className={styles.transactionList}>
      {transactions.map((transaction) => (
        <div key={transaction.id} className={styles.transaction} onClick={() => onEdit(transaction)}>
          <div className={styles.row}>
            <div className={styles.description}>{transaction.description}</div>
            <div className={`${styles.amount} ${transaction.type === TransactionType.INCOME ? styles.credit : styles.debit}`}>
            {transaction.type === TransactionType.INCOME ? '+' : '-'}{formatAmount(parseFloat(transaction.amount))} <FaRupeeSign />
            </div>
          </div>
          <div className={`${styles.row} ${styles.smallFont}`}>
            <div className={styles.category}>{transaction.category}</div>
            <div className={styles.date}>{transaction.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;