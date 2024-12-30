import React from "react";
import {
  FaShoppingCart,
  FaUtensils,
  FaGasPump,
  FaHeartbeat,
  FaTshirt,
  FaFilm,
  FaMoneyBillWave,
  FaPiggyBank,
  FaDollarSign,
  FaQuestion,
  FaPhone,
  FaMobile,
  FaHeadSideCough,
  FaBookMedical,
  FaClinicMedical,
  FaCar,
  FaBiking,
} from "react-icons/fa";
import { formatAmount } from "../../utils/services";
import styles from "./CategorySpending.module.css";

const categoryIcons = {
  Groceries: (
    <div className={styles.icon}>
      <FaShoppingCart
        style={{ color: "var(--color-groceries)", marginTop: 5 }}
      />
    </div>
  ),
  Food: (
    <div className={styles.icon}>
      <FaUtensils style={{ color: "var(--color-food)", marginTop: 5 }} />
    </div>
  ),
  Petrol: (
    <div className={styles.icon}>
      <FaGasPump style={{ color: "var(--color-petrol)", marginTop: 5 }} />
    </div>
  ),
  Medical: (
    <div className={styles.icon}>
      <FaClinicMedical style={{ color: "var(--color-medical)", marginTop: 5 }} />
    </div>
  ),
  Shopping: (
    <div className={styles.icon}>
      <FaTshirt style={{ color: "var(--color-shopping)", marginTop: 5 }} />
    </div>
  ),
  Entertainment: (
    <div className={styles.icon}>
      <FaFilm style={{ color: "var(--color-entertainment)", marginTop: 5 }} />
    </div>
  ),
  EMI: (
    <div className={styles.icon}>
      <FaMoneyBillWave style={{ color: "var(--color-emi)", marginTop: 5 }} />
    </div>
  ),
  SIP: (
    <div className={styles.icon}>
      <FaPiggyBank style={{ color: "var(--color-sip)", marginTop: 5 }} />
    </div>
  ),
  Recharge: (
    <div className={styles.icon}>
      <FaMobile style={{ color: "var(--color-recharge)", marginTop: 5 }} />
    </div>
  ),
  "Recharge System": (
    <div className={styles.icon}>
      <FaMobile style={{ color: "var(--color-recharge-system)", marginTop: 5 }} />
    </div>
  ),
  Other: (
    <div className={styles.icon}>
      <FaQuestion style={{ color: "var(--color-other)", marginTop: 5 }} />
    </div>
  ),
  UPI: (
    <div className={styles.icon}>
      <FaMoneyBillWave style={{ color: "var(--color-upi)", marginTop: 5 }} />
    </div>
  ),
  Salary: (
    <div className={styles.icon}>
      <FaDollarSign style={{ color: "var(--color-salary)", marginTop: 5 }} />
    </div>
  ),
  Healthcare: (
    <div className={styles.icon}>
      <FaClinicMedical style={{ color: "var(--color-salary)", marginTop: 5 }} />
    </div>
  ),
  "Car Maintenance": (
    <div className={styles.icon}>
      <FaCar style={{ color: "var(--color-Car)", marginTop: 5 }} />
    </div>
  ),
  "Bike Maintenance": (
    <div className={styles.icon}>
      <FaBiking style={{ color: "var(--color-Bike)", marginTop: 5 }} />
    </div>
  ),
};

const CategorySpending = ({ categorySpendings }) => {
  const totalAmount = categorySpendings.reduce(
    (total, { amount }) => total + amount,
    0
  );

  return (
    <div className={styles.categorySpendingContainer}>
      <div className={styles.headerText}>Category-wise spending</div>
      <div className={styles.list}>
        {categorySpendings.map(({ category, amount }) => (
          <div key={category} className={styles.listItem}>
            <div className={styles.categoryName}>
              {categoryIcons[category] || (
                <div className={styles.icon}>
                  <FaQuestion
                    className={styles.icon}
                    style={{ color: "#A9A9A9" }}
                  />
                </div>
              )}
              {category}
            </div>
            <div className={styles.amount}>{formatAmount(amount)}</div>
          </div>
        ))}
        <div className={styles.totalRow}>
          <div></div>
          <div className={styles.totalAmount}>{formatAmount(totalAmount)}</div>
        </div>
      </div>
    </div>
  );
};

export default CategorySpending;
