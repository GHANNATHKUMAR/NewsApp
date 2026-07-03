const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/news", async (req, res) => {
    try {

        const category = req.query.category || "general";
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 8;

        const response = await axios.get(
            "https://newsapi.org/v2/top-headlines",
            {
                params: {
                    country: "us",
                    category: category,
                    page: page,
                    pageSize: pageSize,
                    apiKey: process.env.NEWS_API_KEY,
                },
            }
        );

        res.json(response.data);

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            message: "Unable to fetch news"
        });

    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});