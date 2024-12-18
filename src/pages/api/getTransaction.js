// src/pages/api/getTransaction.js
import sheets from '../../../googleSheets';
import { TransactionType, TransactionCategory } from '../../../utils/enums';

/**
 * @swagger
 * /api/getTransaction:
 *   get:
 *     summary: Get transactions
 *     tags: [ExpenseManager]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: The start date to filter transactions
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: The end date to filter transactions
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Spending, Income]
 *         required: false
 *         description: The type of transactions to filter
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Groceries, Food, Petrol, Medical, Shopping, Entertainment, EMI, SIP, Income, Other]
 *         required: false
 *         description: The category of transactions to filter
 *     responses:
 *       200:
 *         description: A list of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2023-12-01"
 *                   description:
 *                     type: string
 *                     example: "Grocery shopping"
 *                   type:
 *                     type: string
 *                     enum: [Spending, Income]
 *                     example: "Spending"
 *                   amount:
 *                     type: number
 *                     example: 50.75
 *                   category:
 *                     type: string
 *                     example: "Groceries"
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 *       405:
 *         description: Method not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Method 'POST' Not Allowed"
 */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { startDate, endDate, type, category } = req.query;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Sheet1!A:F',
    });

    let transactions = response.data.values.slice(1); // Remove header row

    // Skip rows with empty, null, or undefined IDs
    transactions = transactions.filter(transaction => transaction[0]);

    // Filter by start date and end date
    if (startDate) {
      transactions = transactions.filter(transaction => new Date(transaction[1]) >= new Date(startDate));
    }
    if (endDate) {
      transactions = transactions.filter(transaction => new Date(transaction[1]) <= new Date(endDate));
    }

    // Filter by type
    if (type && Object.values(TransactionType).includes(type)) {
      transactions = transactions.filter(transaction => transaction[3] === type);
    }

    // Filter by category
    if (category && Object.values(TransactionCategory).includes(category)) {
      transactions = transactions.filter(transaction => transaction[5] === category);
    }

    // Map transactions to objects
    transactions = transactions.map(transaction => ({
      id: transaction[0],
      date: transaction[1],
      description: transaction[2],
      type: transaction[3],
      amount: transaction[4],
      category: transaction[5],
    }));

    // Sort transactions by date (latest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(transactions);
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}