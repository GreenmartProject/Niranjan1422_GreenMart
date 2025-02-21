const { PRODUCTCATEGOTY_TABLE } = require("../config");
const express = require("express");
const router = express.Router();
const pool = require("../db");
const utils = require("../utils");

//fetch all categories
router.get("/allCategories", (request, response) => {
    const statement = `SELECT * FROM ${PRODUCTCATEGOTY_TABLE}`;
  
    pool.execute(statement, (err, result) => {
      if (err) {
        response.send(utils.createError(err.message));
      } else {
        response.send(utils.createSuccess(result));
      }
    });
});

//search Product by category
router.get("/category", (request, response) => {
    const { CategoryName } = request.query;
  
    console.log("Searching for products with category:", CategoryName);
  
    const statement = `SELECT * FROM ${PRODUCTCATEGOTY_TABLE} WHERE CategoryName LIKE ?`;
  
    pool.execute(statement, [`%${CategoryName}%`], (err, result) => {
      if (err) {
        response.send(utils.createError(err.message));
      } else {
        console.log("Query result:", result);
  
        if (result.length === 0) {
          response
            .status(404)
            .send(utils.createError("No Product found with this Category"));
        } else {
          response.send(utils.createSuccess(result));
        }
      }
    });
  });

 module.exports = router;