const express = require("express");
const router = express.Router();
const pool = require("../db");
const utils = require("../utils");
const { PRODUCT_TABLE, ORDER_TABLE } = require("../config");


// Order Product
router.post("/order", (request, response) => {
    const { UserID, ProductID, quantity } = request.body;
    console.log("req.body: ", request.body);
  
    const statement = `SELECT StockQuantity, Price FROM ${PRODUCT_TABLE} WHERE ProductID =?`;
    pool.execute(statement, [ProductID], (err, result) => {
      if (err) {
        return response.status(404).send(utils.createError(err));
      }
  
      if (result.length === 0) {
        return response.status(404).send(utils.createError("Product not found"));
      }
  
      const StockQuantity = result[0].StockQuantity;
      const Price = result[0].Price;
      const TotalPrice = Price * quantity;
      console.log("stock quantity: ", StockQuantity);
      console.log("quantity: ", quantity);
      console.log("price per unit: ", Price);
      console.log("total price: ", TotalPrice);
  
      if (quantity <= StockQuantity) {
        const updateStatement = `
            UPDATE ${PRODUCT_TABLE}
            SET StockQuantity = StockQuantity - ?
            WHERE ProductID = ?
          `;
  
        pool.execute(updateStatement, [quantity, ProductID], (err, result) => {
          if (err) {
            return response.status(500).send(utils.createError(err));
          }
          console.log("update product quantity: result: " + JSON.stringify(result));
  
          const orderStatement = `
              INSERT INTO ${ORDER_TABLE} (UserID, ProductID, quantity, TotalPrice, OrderDate,OrderStatusID)
              VALUES (?, ?, ?, ?, NOW(),?)  
            `;
  
          pool.execute(
            orderStatement,
            [UserID, ProductID, quantity, TotalPrice,1],
            (err, result) => {
              if (err) {
                console.log("order error: " + JSON.stringify(err));
  
                return response
                  .status(500)
                  .send(utils.createError("Error inserting into order table"));
              }
  
              console.log("result: " + JSON.stringify(result));
  
              response.send(utils.createSuccess("Product Order successfully"));
            }
          );
        });
      } else {
        response.status(400).send(utils.createError("Insufficient stock"));
      }
    });
  });


  //Update Order Status

router.put("/orderStatus",(request,response)=>{
    const{ OrderID,OrderStatusID } = request.body;

    const statement=`UPDATE ${ORDER_TABLE} SET OrderStatusId=?
                     WHERE OrderID=?`;
    console.log(OrderID,OrderStatusID);
    pool.execute(statement,[OrderStatusID,OrderID],(err,result)=>{
      if(err){
        return response
          .status(500)
          .send(utils.createError("Error in updating order status"));
          
      }

      if(result.affectedRows == 0){
        return response
          .status(404)
          .send(utils.createError("Order not found"));
      }
      response.send(utils.createSuccess("Order status updated successfully"));
    });                
  });


//fetch all orders from Id

router.get("/order/:UserID", (request, response) => {
  const { UserID } = request.params;

  const statement=`SELECT 
         o.OrderID,
         o.OrderDate,
         o.TotalPrice,
         o.quantity,
         o.OrderStatusID,
         os.StatusDescription,
         p.Name AS ProductName,
         p.Price AS ProductPrice
        FROM ${ORDER_TABLE} o
        LEFT JOIN 
          orderstatus os ON o.OrderStatusID = os.OrderStatusID
        LEFT JOIN
           product p ON o.ProductID = p.ProductID
        WHERE o.UserID = ?;`;
  

  pool.execute(statement, [UserID], (err, result) => {
    if (err) {
      console.log("Error fetching orders: ", err);
      return response
        .status(500)
        .send(utils.createError("Error fetching orders"));
    }

    if (result.length === 0) {
      return response
        .status(404)
        .send(utils.createError("No orders found for this user"));
    }

    response.send(utils.createSuccess(result));
  });
});

  module.exports = router;