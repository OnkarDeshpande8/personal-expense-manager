export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export  const fetchTransactionsWithFilters = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`/api/getTransaction?${query}`);
  return await res.json();
};