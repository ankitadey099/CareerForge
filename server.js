const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "CareerForge API is running 🚀"
    });
});

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

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`CareerForge server running on port ${PORT}`);
});
