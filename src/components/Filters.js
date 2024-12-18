// components/Filters.js
import React, { useState } from 'react';
import styles from './Filters.module.css';

const Filters = ({ onChange }) => {
  const [filters, setFilters] = useState({
    date: '',
    type: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.filters}>
      <input name="date" value={filters.date} onChange={handleChange} placeholder="Filter by date" />
      <input name="type" value={filters.type} onChange={handleChange} placeholder="Filter by type" />
    </div>
  );
};

export default Filters;