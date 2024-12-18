// src/pages/api/CRUDGoogleSheet/update.js
import sheets from '../../../../googleSheets';

/**
 * @swagger
 * /api/CRUDGoogleSheet/update:
 *   put:
 *     summary: Update an existing transaction
 *     tags: [GoogleSheet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 2
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
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction updated"
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
  if (req.method === 'PUT') {
    const { id, date, description, type, amount, category } = req.body;

    var rowIndex = parseInt(id) + 1;
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SHEET_ID,
      range: `Sheet1!${rowIndex}:${rowIndex}`,
      valueInputOption: 'RAW',
      resource: {
        values: [[id, date, description, type, amount, category]],
      },
    });

    res.status(200).json({ message: 'Transaction updated' });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}