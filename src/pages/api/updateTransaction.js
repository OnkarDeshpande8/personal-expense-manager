import sheets from "../../../googleSheets";
import { TransactionType, TransactionCategory, PaymentType } from "../../../utils/enums";

/**
 * @swagger
 * /api/updateTransaction:
 *   put:
 *     summary: Update an existing transaction
 *     tags: [ExpenseManager]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "2"
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
 *                 example: 50.75
 *               category:
 *                 type: string
 *                 example: "Groceries"
 *               paymentType:
 *                 type: string
 *                 enum: [Cash, UPI]
 *                 example: "Cash"
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, date, description, type, amount, category, paymentType } = req.body;

    if (!id || !date || !description || !type || !amount || !category || !paymentType) {
      return res.status(400).json({ error: "All fields are required" });
    }

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

    try {
      // Fetch existing transactions to determine the row index
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet1!A:A", // Fetch only the ID column
      });

      const ids = response.data.values.map((row, index) => ({
        id: row[0],
        index: index + 1,
      }));
      const rowIndex = ids.find((row) => row.id === id)?.index;

      if (!rowIndex) {
        return res.status(400).json({ error: "Transaction not found" });
      }

      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SHEET_ID,
        range: `Sheet1!${rowIndex}:${rowIndex}`,
        valueInputOption: "RAW",
        resource: {
          values: [[id, date, description, type, amount, category, paymentType]],
        },
      });

      res.status(200).json({ message: "Transaction updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
