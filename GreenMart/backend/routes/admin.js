const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const utils = require("../utils");
const { PRODUCT_TABLE, PRODUCTCATEGOTY_TABLE, USER_TABLE } = require("../config");

const fs = require("fs");
const path = require("path");
const uploadDir = path.join(__dirname, "../uploads");

// Fetch all users
router.get("/user", (request, response) => {
    const statement = `SELECT * FROM ${USER_TABLE}`;
    pool.execute(statement, (err, rows) => {
        if (err) return response.status(500).send(utils.createError(err.message));
        if (rows.length === 0) return response.status(404).send("No users found");
        response.json(utils.createSuccess(rows));
    });
});

// Fetch user by ID
router.get("/user/:id", (request, response) => {
    const { id } = request.params;
    const statement = `SELECT * FROM ${USER_TABLE} WHERE UserID = ?`;
    pool.execute(statement, [id], (err, rows) => {
        if (err) return response.status(500).send(utils.createError(err.message));
        if (rows.length === 0) return response.status(404).send("No user found");
        response.json(utils.createSuccess(rows[0]));
    });
});

// Fetch all products
router.get("/product", (request, response) => {
     
    const statement = `
    SELECT 
        ProductID, Name, Price, StockQuantity, 
        CASE 
            WHEN image IS NOT NULL AND image NOT LIKE 'http%' 
            THEN CONCAT('http://localhost:7777/', image) 
            ELSE image 
        END AS image
    FROM ${PRODUCT_TABLE}`;

    pool.execute(statement, (err, result) => {
        if (err) return response.status(500).send(utils.createError(err.message));
        response.json(utils.createSuccess(result));
    });
});

// Fetch product by ID
router.get("/product/:id", (request, response) => {
    const { id } = request.params;
    const statement = `SELECT * FROM ${PRODUCT_TABLE} WHERE ProductID = ?`;
    pool.execute(statement, [id], (err, result) => {
        if (err) return response.status(500).send(utils.createError("Error fetching product"));
        if (result.length === 0) return response.status(404).send(utils.createError("No product for this ID"));
        response.send(utils.createSuccess(result[0]));
    });
});

// Fetch all product categories
router.get("/productcategory", (request, response) => {
    const statement = `SELECT * FROM ${PRODUCTCATEGOTY_TABLE}`;
    pool.execute(statement, (err, rows) => {
        if (err) return response.status(500).send(utils.createError(err.message));
        if (rows.length === 0) return response.status(404).send("No categories found");
        response.json(utils.createSuccess(rows));
    });
});

// Fetch product category by ID
router.get("/productcategory/:id", (request, response) => {
    const { id } = request.params;
    const statement = `SELECT * FROM ${PRODUCTCATEGOTY_TABLE} WHERE CategoryID = ?`;
    pool.execute(statement, [id], (err, rows) => {
        if (err) return response.status(500).send(utils.createError(err.message));
        if (rows.length === 0) return response.status(404).send("No category found");
        response.json(utils.createSuccess(rows[0]));
    });
});


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "uploads");
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Add product
router.post("/addproduct", upload.single("image"), (request, response) => {
  console.log("Request Body:", request.body); // Use 'request' here
  console.log("Uploaded file:", request.file);  // Use 'request' here for the file

  const { Name, Price, StockQuantity, CategoryID } = request.body;
  const ImageURL = request.file ? `http://localhost:7777/uploads/${request.file.filename}` : null;
  const image = request.file ? `uploads/${request.file.filename}` : null;

  if (!Name || !Price || !StockQuantity) {
      return response.status(400).json({ error: "Missing required fields" });
  }

  console.log("Image URL:", ImageURL); // Debugging log

  const statement = `
      INSERT INTO ${PRODUCT_TABLE} (Name, Price, StockQuantity, ImageURL,image, CategoryID) 
      VALUES (?, ?, ?, ?, ?,?)`;

  pool.execute(
      statement,
      [Name, parseFloat(Price), parseInt(StockQuantity), ImageURL, image,CategoryID || null],
      (err, result) => {
          if (err) return response.status(500).send(utils.createError(err.message));
          response.json(utils.createSuccess("Product added successfully"));
      }
  );
});


// Add product category
router.post("/addproductcategory", upload.single("image"), (request, response) => {
    const { CategoryName } = request.body;
    const ImageURL = request.file ? `uploads/${request.file.filename}` : null;

    const statement = `INSERT INTO ${PRODUCTCATEGOTY_TABLE} (CategoryName, ImageURL) VALUES (?, ?)`;
    pool.execute(statement, [CategoryName, ImageURL], (err, result) => {
        if (err) return response.status(500).send(utils.createError(err.message));
        response.json(utils.createSuccess("Product category added successfully"));
    });
});

module.exports = router;
