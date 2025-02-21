DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `productcategory`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `orderstatus`;
DROP TABLE IF EXISTS `orderdetails`;

CREATE TABLE `order` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `OrderDate` datetime DEFAULT NULL,
  `TotalPrice` decimal(10,2) DEFAULT NULL,
  `OrderStatusID` int DEFAULT NULL,
  `ProductID` int DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`OrderID`),
  KEY `UserID` (`UserID`),
  KEY `OrderStatusID` (`OrderStatusID`),
  KEY `FK_ProductID` (`ProductID`),
  CONSTRAINT `FK_ProductID` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`) ON DELETE CASCADE,
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`OrderStatusID`) REFERENCES `orderstatus` (`OrderStatusID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


 CREATE TABLE user (
  `UserID` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Address` text,
  `Phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `product` (
  `ProductID` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `StockQuantity` int DEFAULT NULL,
  `ImageURL` text,
  `CategoryID` int DEFAULT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `CategoryID` (`CategoryID`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `productcategory` (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `productcategory` (
  `CategoryID` int NOT NULL,
  `CategoryName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `admin` (
  `AdminID` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`AdminID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


 CREATE TABLE `orderstatus` (
  `OrderStatusID` int NOT NULL,
  `StatusDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`OrderStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `orderdetails` (
  `OrderDetailID` int NOT NULL,
  `OrderID` int DEFAULT NULL,
  `ProductID` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `UnitPrice` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`OrderDetailID`),
  KEY `ProductID` (`ProductID`),
  KEY `orderdetails_fk` (`OrderID`),
  CONSTRAINT `orderdetails_fk` FOREIGN KEY (`OrderID`) REFERENCES `order` (`OrderID`) ON DELETE CASCADE,
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `productcategory` (
  `CategoryID` int NOT NULL,
  `CategoryName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



INSERT INTO `user` (`UserID`, `Name`, `Email`, `Password`, `Address`, `Phone`) VALUES
(1, 'Prajakta', 'Prajakta@gmail.com', 'P123@', 'Pune', '9874563210'),
(2, 'Himanshi', 'Himanshi@gmail.com', 'P123@', 'Gwalior', '8795463211'),
(3, 'Nayan', 'nayan@gmail.com', 'P123@','Nashik', '9766487200'),
(4, 'Niranjan', 'niranjan45@gmail.com', 'P123@','Karad', '7030540074');

INSERT INTO `admin` (`AdminID`, `Name`, `Email`, `Password`, `Role`) VALUES
(1, 'Prajakta', 'prajaktakadam63341@gmail.com', 'Prajakta@123', 'Admin'),
(2, 'Himanshi', 'himanshiverma638@gmail.com', 'Himanshi', 'Admin'),
(3, 'Nayan', 'nayan12@gamil.com', 'Nayan', 'Admin'),
(4, 'Niranjan', 'niranjan29@gmail.com', 'Niranjan', 'Admin');


INSERT INTO `order` (`OrderID`, `UserID`, `OrderDate`, `TotalPrice`, `OrderStatusID`, `ProductID`, `quantity`) VALUES
(1, 1, '2024-12-28 09:00:01', 0.00, 2, 2, 5),
(2, 1, '2024-12-28 09:11:21', 150.00, NULL, 2, 5),
(3, 1, '2024-12-28 09:18:39', 150.00, NULL, 2, 5),
(4, 1, '2024-12-28 09:19:23', 150.00, 1, 2, 5);

INSERT INTO `orderstatus` (`OrderStatusID`, `StatusDescription`) VALUES
(1, 'Pending'),
(2, 'Shipped'),
(3, 'Delivered');


INSERT INTO `product` (`ProductID`, `Name`, `Price`, `StockQuantity`, `ImageURL`, `CategoryID`) VALUES
(1, 'Tomato', 20.50, 100, NULL, 1),
(2, 'Apple', 30.00, 10, NULL, 2),
(3, 'Millet', 40.00, 150, NULL, 3),
(4, 'Almonds', 150.00, 200, NULL, 4),
(5, 'Chickpeas', 60.00, 120, NULL, 5),
(6, 'Cumin', 80.00, 80, NULL, 6);


INSERT INTO `productcategory` (`CategoryID`, `CategoryName`) VALUES
(1, 'vegetables'),
(2, 'fruits'),
(3, 'millets'),
(4, 'nuts'),
(5, 'pulses'),
(6, 'spices');
