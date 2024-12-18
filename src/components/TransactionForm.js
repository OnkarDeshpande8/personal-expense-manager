// components/TransactionForm.js
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { TransactionType, TransactionCategory } from "../../utils/enums";
import styles from "./TransactionForm.module.css";

const TransactionForm = ({ initialData, onSubmit, onClose, onDelete }) => {
  const [form, setForm] = useState({
    date: "",
    description: "",
    type: "",
    amount: "",
    category: "",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(form.id);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>
            {initialData ? "Edit Transaction" : "Add Transaction"}
          </h1>
          <div className={styles.row}>
            <input
              className={styles.input}
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="Date"
              type="date"
              required
            />
            <input
              className={styles.input}
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              type="number"
              step="0.01"
              max="100000000"
              required
            />
          </div>
          <div className={styles.row}>
            <select
              className={styles.select}
              name="type"
              value={form.type}
              onChange={handleChange}
              required
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
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {Object.values(TransactionCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className={styles.inputFull}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            maxLength="200"
            rows="2"
            required
          />
          <div>
            {initialData ? (
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.deletebutton}`}
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button className={`${styles.button}`} type="submit">
                  Update
                </button>
              </div>
            ) : (
              <button className={`${styles.button}`} type="submit">
                Add Transaction
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TransactionForm;
