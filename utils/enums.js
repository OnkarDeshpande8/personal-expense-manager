// utils/enums.js

export const FilterType = Object.freeze({
  MONTHLY: "monthly",
  YEARLY: "yearly",
});

// Enum for transaction type
export const TransactionType = Object.freeze({
  SPENDING: "Spending",
  INCOME: "Income",
  SAVING: "Saving",
});

// Enum for Payment type
export const PaymentType = Object.freeze({
  UPI: "UPI",
  CASH: "Cash",
  BANK: "Bank",
});

export const Years = Object.freeze({
  2024: "2024",
  2025: "2025",
  2026: "2026",
  2027: "2027",
  2028: "2028",
  2029: "2029",
  2030: "2030",
});

// Enum for transaction category
export const TransactionCategory = Object.freeze({
  GROCERIES: "Groceries",
  FOOD: "Food",
  MEDICAL: "Medical",
  SHOPPING: "Shopping",
  UPI: "UPI",
  CAR_MAINTENANCE: "Car Maintenance",
  BIKE_MAINTENANCE: "Bike Maintenance",
  ENTERTAINMENT: "Entertainment",
  RECHARGE: "Recharge",
  PETROL: "Petrol",
  INCOME: "Income",
  SALARY: "Salary",
  RECHARGE_SYSTEM: "Recharge System",
  EMI: "EMI",
  SIP: "SIP",
  HEALTHCARE: "Healthcare",
  OTHER: "Other",
});

// Enum for column names
export const ColumnNames = Object.freeze({
  ID: "id",
  DATE: "date",
  DESCRIPTION: "description",
  TYPE: "type",
  AMOUNT: "amount",
  CATEGORY: "category",
  PAYMENT_TYPE: "paymentType",
});
