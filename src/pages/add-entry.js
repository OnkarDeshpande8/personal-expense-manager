// pages/add-entry.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TransactionForm from '../components/TransactionForm';
import styles from './AddEntry.module.css';

const AddEntry = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = async (form) => {
    try {
      const res = await fetch('/api/addTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Transaction added successfully!');
        setError(null);
        setIsModalOpen(false);

        // Clear the message after 5 seconds
        setTimeout(() => {
          setMessage(null);
          setIsModalOpen(true);
        }, 2000);
      } else {
        setMessage(null);
        setError(result.error || 'Failed to add transaction.');

        // Clear the error after 5 seconds
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (err) {
      setMessage(null);
      setError('Failed to add transaction.');

      // Clear the error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage(null);
    setError(null);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      {/* <button className={styles.button} onClick={() => setIsModalOpen(true)}>Add Transaction</button> */}
      {isModalOpen && (
        <TransactionForm onSubmit={handleSubmit} onClose={handleCloseModal} />
      )}
      {(message || error) && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {message && <p className={styles.success}>{message}</p>}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEntry;