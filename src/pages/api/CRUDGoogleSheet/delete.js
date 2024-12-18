// src/pages/api/CRUDGoogleSheet/delete.js
import sheets from '../../../../googleSheets';

/**
 * @swagger
 * /api/CRUDGoogleSheet/delete:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [GoogleSheet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rowIndex:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction deleted"
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
  if (req.method === 'DELETE') {
    const { rowIndex } = req.body;

    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.SHEET_ID,
      range: `Sheet1!${rowIndex}:${rowIndex}`,
    });

    res.status(200).json({ message: 'Transaction deleted' });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}