import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/news", async (req, res) => {
  try {
    const country = req.query.country || "us";
    const category = req.query.category || "general";
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 5;

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
