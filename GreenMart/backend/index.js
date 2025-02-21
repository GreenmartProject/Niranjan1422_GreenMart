const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const bodyParser = require("body-parser");
const categories = require('./routes/categories');
const orders = require('./routes/orders');
const admin = require('./routes/admin');
const user = require('./routes/user');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test api
app.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Routes
const userRoutes = require("./routes/user");
const categoriesRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");


app.use("/user", userRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoriesRoutes);
app.use("/admin",adminRoutes);
app.use("/uploads", express.static("uploads"))

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
