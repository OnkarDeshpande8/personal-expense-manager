// utils/enums.js

export const FilterType = Object.freeze({
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
});

// Enum for transaction type
export const TransactionType = Object.freeze({
  SPENDING: 'Spending',
  INCOME: 'Income',
});

export const Years = Object.freeze({
  2024: '2024',
  2025: '2025',
  2026: '2026',
  2027: '2027',
  2028: '2028',
  2029: '2029',
  2030: '2030',
});
// Enum for transaction category
export const TransactionCategory = Object.freeze({
  GROCERIES: 'Groceries',
  FOOD: 'Food',
  PETROL: 'Petrol',
  MEDICAL: 'Medical',
  SHOPPING: 'Shopping',
  RECHARGE: 'Recharge',
  ENTERTAINMENT: 'Entertainment',
  EMI: 'EMI',
  SIP: 'SIP',
  INCOME: 'Income',
  OTHER: 'Other',
});

// Enum for column names
export const ColumnNames = Object.freeze({
  ID: 'id',
  DATE: 'date',
  DESCRIPTION: 'description',
  TYPE: 'type',
  AMOUNT: 'amount',
  CATEGORY: 'category',
});