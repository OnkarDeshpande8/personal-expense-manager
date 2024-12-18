// src/pages/api/CRUDGoogleSheet/read.js
import sheets from '../../../../googleSheets';

/**
 * @swagger
 * /api/CRUDGoogleSheet/read:
 *   get:
 *     summary: Fetch transactions
 *     tags: [GoogleSheet]
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
 *                   date:
 *                     type: string
 *                   description:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   category:
 *                     type: string
 *       405:
 *         description: Method Not Allowed
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
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      // range: 'Sheet1!A:B',
      range: 'Sheet1',
    });

    const transactions = response.data.values;

    res.status(200).json(transactions);
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}