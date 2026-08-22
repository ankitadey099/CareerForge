require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());


// =====================================
// DATABASE CONNECTION
// =====================================

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing.");
} else {
    mongoose
        .connect(MONGODB_URI)
        .then(() => {
            console.log("✅ MongoDB connected successfully");
        })
        .catch((error) => {
            console.error("❌ MongoDB connection failed:", error.message);
        });
}


// =====================================
// USER MODEL
// =====================================

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);


// =====================================
// HOME ROUTE
// =====================================

app.get("/", (req, res) => {
    res.json({
        message: "CareerForge API is running 🚀"
    });
});


// =====================================
// REGISTER
// =====================================

app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields."
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters."
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        res.status(201).json({
            message: "Registration successful!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error("Registration error:", error);

        res.status(500).json({
            message: "Registration failed. Please try again."
        });
    }
});


// =====================================
// LOGIN
// =====================================

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password."
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Login successful
        res.json({
            message: "Login successful!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed. Please try again."
        });
    }
});


// =====================================
// AI CAREER COACH
// =====================================

app.post("/coach", async (req, res) => {

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({
            message: "Please enter a question."
        });
    }

    try {

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


// =====================================
// SERVER
// =====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 CareerForge server running on port ${PORT}`);
});
