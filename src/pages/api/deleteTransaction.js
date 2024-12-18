import sheets from "../../../googleSheets";

/**
 * @swagger
 * /api/deleteTransaction:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [ExpenseManager]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Transaction ID is required" });
  }

  try {
    // Fetch existing transactions to determine the next ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A:A", // Fetch only the ID column
    });

    const ids = response.data.values.map((row, index) => ({
      id: row[0],
      index: index,
    }));
    const rowIndex = ids.find((row) => row.id === id)?.index;

    if (!rowIndex) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const request = {
      spreadsheetId: process.env.SHEET_ID,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // 0 is typically the default sheet ID
                dimension: "ROWS", // 'ROWS' or 'COLUMNS'
                startIndex: rowIndex, // starting row index
                endIndex: rowIndex + 1, // ending row index (exclusive)
              },
            },
          },
        ],
      },
    };
    await sheets.spreadsheets.batchUpdate(request);

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
