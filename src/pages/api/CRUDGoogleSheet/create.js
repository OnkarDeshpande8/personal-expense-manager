// pages/api/CRUDGoogleSheet/create.js
import sheets from "../../../../googleSheets";
import {
  ColumnNames,
  TransactionType,
  TransactionCategory,
  PaymentType,
} from "../../../../utils/enums";

/**
 * @swagger
 * /api/CRUDGoogleSheet/create:
 *   post:
 *     summary: Add a new transaction
 *     tags: [GoogleSheet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-01"
 *               description:
 *                 type: string
 *                 example: "Grocery shopping"
 *               type:
 *                 type: string
 *                 enum: [Spending, Income]
 *                 example: "Spending"
 *               amount:
 *                 type: number
 *                 example: 50
 *               category:
 *                 type: string
 *                 enum: [Groceries, Food, Petrol, Medical, Shopping, Entertainment, EMI, SIP, Income, Other]
 *                 example: "Groceries"
 *               paymentType:
 *                 type: string
 *                 enum: [Cash, UPI]
 *                 example: "Cash"
 *     responses:
 *       200:
 *         description: Transaction added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction added"
 *       405:
 *         description: Method Not Allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Method 'GET' Not Allowed"
 */
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { date, description, type, amount, category, paymentType } = req.body;

    // Validate type, category, and payment type using enums
    if (!Object.values(TransactionType).includes(type)) {
      return res.status(400).json({ error: "Invalid transaction type" });
    }
    if (!Object.values(TransactionCategory).includes(category)) {
      return res.status(400).json({ error: "Invalid transaction category" });
    }
    if (!Object.values(PaymentType).includes(paymentType)) {
      return res.status(400).json({ error: "Invalid payment type" });
    }

    // Fetch existing transactions to determine the next ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A:A", // Fetch only the ID column
    });

    const existingIds = response.data?.values?.flat().map(Number);
    const nextId = existingIds?.length > 1 ? existingIds?.length : 1;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A:G",
      valueInputOption: "RAW",
      resource: {
        values: [
          [nextId, date, description, type, amount, category, paymentType],
        ],
      },
    });

    res.status(200).json({ message: "Transaction added" });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
