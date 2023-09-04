const axios = require("axios");
const express = require("express");
const cors = require("cors");
const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/stocks", async (req, res) => {
    try {
        const { symbol, startDate, endDate } = req.body;

        const tiingoResponse = await axios.get(
            `https://api.tiingo.com/tiingo/daily/${symbol}/prices`,
            {
                params: {
                    startDate,
                    endDate,
                    token: "1d7b20305873aaacd13fb46eaef129aede7cf626",
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const tiingoStockData = tiingoResponse.data;
        res.send(tiingoStockData);
    } catch (error) {
        console.error("Error fetching Tiingo data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
