// pages/Statistics.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { TransactionType, TransactionCategory } from "../../utils/enums";
import {
  formatAmount,
  formatDate,
  fetchTransactionsWithFilters,
} from "../../utils/services";
import { FaFilter, FaRupeeSign } from "react-icons/fa";
import styles from "./Statistics.module.css";
import IncomeSpending from "@/components/IncomeSpending";

const Statistics = () => {
  const now = new Date();
  const firstDay = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));
  const lastDay = formatDate(
    new Date(now.getFullYear(), now.getMonth() + 1, 0)
  );

  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: firstDay,
    endDate: lastDay,
    type: TransactionType.SPENDING,
    category: "",
    description: "",
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchTransactions = async () => {
    fetchTransactionsWithFilters(filters).then((data) => setTransactions(data));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdate = async (form) => {
    try {
      const res = await fetch(`/api/updateTransaction`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Transaction updated successfully!");
        setError(null);
        setEditingTransaction(null);
        fetchTransactions();

        // Clear the message after 2 seconds
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } else {
        setMessage(null);
        setError(result.error || "Failed to update transaction.");

        // Clear the error after 2 seconds
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (err) {
      setMessage(null);
      setError("Failed to update transaction.");

      // Clear the error after 2 seconds
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deleteTransaction?id=${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Transaction deleted successfully!");
        setError(null);
        setEditingTransaction(null);
        fetchTransactions();

        // Clear the message after 2 seconds
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } else {
        setMessage(null);
        setError(result.error || "Failed to delete transaction.");

        // Clear the error after 2 seconds
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (err) {
      setMessage(null);
      setError("Failed to delete transaction.");

      // Clear the error after 2 seconds
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
    setMessage(null);
    setError(null);
  };

  const totalIncome = formatAmount(
    transactions
      .filter((transaction) => transaction.type === TransactionType.INCOME)
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0)
  );

  const totalSpending = formatAmount(
    transactions
      .filter((transaction) => transaction.type === TransactionType.SPENDING)
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0)
  );

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.subContainer}>
        <h1 className={styles.title}>Statistics</h1>
        <FaFilter
          className={styles.filterIcon}
          onClick={() => setShowFilters(!showFilters)}
        />
      </div>
      {showFilters && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input
              className={styles.input}
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              placeholder="Start Date"
              type="date"
            />
            <input
              className={styles.input}
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              placeholder="End Date"
              type="date"
            />
          </div>
          <div className={styles.row}>
            <select
              className={styles.select}
              name="type"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              {Object.values(TransactionType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              name="category"
              value={filters.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {Object.values(TransactionCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.row}>
            <input
              className={styles.input}
              name="description"
              value={filters.description}
              onChange={handleChange}
              placeholder="Description"
              type="text"
            />
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.button} type="submit">
              Filter
            </button>
          </div>
        </form>
      )}

      <IncomeSpending totalIncome={totalIncome} totalSpending={totalSpending} />

      <div className={styles.totalTransactions}>
        Total Transactions: {transactions.length}
      </div>

      <hr />
      <TransactionList transactions={transactions} onEdit={handleEdit} />
      {editingTransaction && (
        <TransactionForm
          initialData={editingTransaction}
          onSubmit={handleUpdate}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
      {(message || error) && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
