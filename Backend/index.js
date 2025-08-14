// backend/index.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Connect to RDS MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to RDS MySQL database.");
    }
});

// Example API route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Users endpoint
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching users");
        } else {
            res.json(results);
        }
    });
});

// New POST endpoint for form submission
app.post("/submit", (req, res) => {
    const { name, email, password, rollNumber, department, session } = req.body;

    if (!name || !email || !password || !rollNumber || !department || !session) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = `
        INSERT INTO users (name, email, password, rollNumber, department, session) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [name, email, password, rollNumber, department, session], (err, results) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send("Error inserting data");
        }
        res.status(201).json({ message: "User created successfully", userId: results.insertId });
    });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
