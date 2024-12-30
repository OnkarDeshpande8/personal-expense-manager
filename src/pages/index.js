// pages/index.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "./Home.module.css";
import IncomeSpending from "@/components/IncomeSpending";
import CategorySpending from "@/components/CategorySpending";
import { fetchTransactionsWithFilters, formatAmount } from "../../utils/services";
import { FilterType, Years } from "../../utils/enums";

const Home = () => {
  const now = new Date();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const currentYear = now.getFullYear();

  const [filterType, setFilterType] = useState(FilterType.MONTHLY);
  const [selectedMonth, setSelectedMonth] = useState(
    `${currentYear}-${currentMonth}`
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [filters, setFilters] = useState({
    startDate: `${currentYear}-${currentMonth}-01`,
    endDate: `${currentYear}-${currentMonth}-${new Date(
      currentYear,
      now.getMonth() + 1,
      0
    ).getDate()}`,
    type: "",
    category: "",
  });

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [categorySpendings, setCategorySpendings] = useState([]);
  const [transactionData, setTrasactionData] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    const data = await fetchTransactionsWithFilters(filters);
    const income = data
      .filter((transaction) => transaction.type === "Income")
      .reduce(
        (total, transaction) => total + parseFloat(transaction.amount),
        0
      );
    const spending = data
      .filter((transaction) => transaction.type === "Spending")
      .reduce(
        (total, transaction) => total + parseFloat(transaction.amount),
        0
      );

    const categorySpendings = data
      .filter((transaction) => transaction.type === "Spending")
      .reduce((acc, transaction) => {
        const category = transaction.category;
        const amount = parseFloat(transaction.amount);
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
      }, {});

    setTrasactionData(data);
    setTotalIncome(formatAmount(income));
    setTotalSpending(formatAmount(spending));
    setCategorySpendings(
      Object.entries(categorySpendings).map(([category, amount]) => ({
        category,
        amount,
      }))
    );
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    if (e.target.value === FilterType.YEARLY) {
      setFilters({
        ...filters,
        startDate: `${selectedYear}-01-01`,
        endDate: `${selectedYear}-12-31`,
      });
    } else {
      const [year, month] = selectedMonth.split("-");
      setFilters({
        ...filters,
        startDate: `${year}-${month}-01`,
        endDate: `${year}-${month}-${new Date(year, month, 0).getDate()}`,
      });
    }
  };

  const handleMonthChange = (e) => {
    const [year, month] = e.target.value.split("-");
    setSelectedMonth(e.target.value);
    setFilters({
      ...filters,
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-${new Date(year, month, 0).getDate()}`,
    });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setFilters({
      ...filters,
      startDate: `${year}-01-01`,
      endDate: `${year}-12-31`,
    });
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.title}>Expense Manager</div>
      <div className={styles.filterContainer}>
        <select
          className={styles.filterInput}
          id="filterType"
          value={filterType}
          onChange={handleFilterTypeChange}
        >
          {Object.values(FilterType).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        {filterType === FilterType.MONTHLY ? (
          <input
            className={styles.filterInput}
            type="month"
            id="month"
            name="month"
            value={selectedMonth}
            onChange={handleMonthChange}
          />
        ) : (
          <select
            className={styles.filterInput}
            id="year"
            name="year"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {Object.values(Years).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>
      <IncomeSpending totalIncome={totalIncome} totalSpending={totalSpending} />
      <CategorySpending categorySpendings={categorySpendings} />
    </div>
  );
};

export default Home;
