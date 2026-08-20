require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.json({
        message: "CareerForge API is running 🚀"
    });
});


// ===============================
// REGISTER
// ===============================

app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    res.json({
        message: "Registration successful!",
        user: {
            name: name,
            email: email
        }
    });
});


// ===============================
// LOGIN
// ===============================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please enter email and password"
        });
    }

    res.json({
        message: "Login successful!"
    });
});


// ===============================
// AI CAREER COACH
// ===============================

app.post("/coach", async (req, res) => {

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({
            message: "Please enter a question."
        });
    }

    try {

        // Temporary AI response
        // We will connect the real AI API here next.

        const answer = `
        CareerForge received your question:

        "${message}"

        Your AI career coach will provide personalized
        guidance here.
        `;

        res.json({
            answer: answer
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "AI service is currently unavailable."
        });
    }
});


// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`CareerForge server running on port ${PORT} 🚀`);
});
