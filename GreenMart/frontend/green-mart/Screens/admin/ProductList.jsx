import React, { useState, useEffect } from "react";
import { View, FlatList, Image } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

const API_URL = "http://localhost:7777";

const fetchData = async (url, setData) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    setData(data.data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

function ProductList() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetchData(`${API_URL}/admin/product`, setProducts);
    }, []);
  

return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.ProductID.toString()}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }}>
          <Card.Cover source={{ uri: item.image }} />
          <Card.Content>
            <Text>{item.Name}</Text>
            <Text>Price: ${item.Price}</Text>
            <Text>Stock: {item.StockQuantity}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}

export default ProductList;