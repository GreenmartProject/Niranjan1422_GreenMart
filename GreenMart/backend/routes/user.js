const express = require("express");
const utils = require("../utils");
const pool = require("../db");
const { USER_TABLE } = require("../config");

const router = express.Router();

// ✅ Register Route (Without Hashing)
router.post("/register", (request, response) => {
   const { Name, Email, Password, Address, Phone } = request.body;

   // Check if the user already exists
   const checkUserQuery = `SELECT * FROM ${USER_TABLE} WHERE Email = ?`;
   pool.execute(checkUserQuery, [Email], (err, users) => {
       if (err) {
           return response.status(500).json({ status: "error", message: "Database error" });
       }
       if (users.length > 0) {
           return response.status(400).json({ status: "error", message: "User already exists" });
       }

       // If user doesn't exist, proceed with registration
       const insertUserQuery = `INSERT INTO ${USER_TABLE} (Name, Email, Password, Address, Phone) VALUES (?, ?, ?, ?, ?)`;
       pool.execute(insertUserQuery, [Name, Email, Password, Address, Phone], (err, result) => {
           if (err) {
               return response.status(500).json({ status: "error", message: "Registration failed" });
           }
           response.status(201).json({ status: "success", message: "Registered successfully" });
       });
   });
});

// ✅ Login Route (Direct Password Matching)
router.post("/login", async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json(utils.createError("Email and Password are required"));
    }

    try {
        const connection = await pool.promise();

        // Check if user exists in the user table
        const [users] = await connection.execute(
            `SELECT UserID, Name, Email, Role FROM user WHERE Email = ? AND Password = ?`,
            [Email, Password]
        );


        if (users.length > 0) {
            return res.json(utils.createSuccess({ user: users[0] }));
        }

        return res.status(404).json(utils.createError("Invalid credentials"));
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json(utils.createError("Server error"));
    }
});


module.exports = router;
