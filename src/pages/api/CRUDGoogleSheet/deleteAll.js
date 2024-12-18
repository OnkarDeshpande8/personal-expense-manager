// src/pages/api/CRUDGoogleSheet/deleteAll.js
import sheets from '../../../../googleSheets';

/**
 * @swagger
 * /api/CRUDGoogleSheet/deleteAll:
 *   delete:
 *     summary: Delete all transactions
 *     tags: [GoogleSheet]
 *     responses:
 *       200:
 *         description: All transactions deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All transactions deleted"
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
    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Sheet1!A2:F', // Clear all data from the second row onwards
    });

    res.status(200).json({ message: 'All transactions deleted' });
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}