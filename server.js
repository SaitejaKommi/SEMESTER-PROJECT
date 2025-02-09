// Backend (server.js)
const express = require("express");
const app = express();
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyAY1rU58nxvKQhVBvn4XMUxRoWZsouTpHw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// API endpoint
app.post("/response", async (req, res) => {
    try {
        const { prompt } = req.body;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        res.json({
            message: "Content generated successfully",
            generatedText: textResponse,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Error generating content",
            error: error.message
        });
    }
});

// Start server
app.listen(3030, () => {
    console.log("Server is running on port 3030");
});