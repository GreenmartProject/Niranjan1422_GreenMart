import React, { useState } from "react";
import { View, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";

const API_URL = "http://10.0.2.2:7777"; // Change if using physical device

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [image, setImage] = useState(null);

  // Function to pick an image
  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        console.error("Image Picker Error: ", response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const handleAddProduct = async () => {
    if (!name || !price || !stockQuantity) {
      alert("Please fill all required fields");
      return;
    }
  
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Price", price);
    formData.append("StockQuantity", stockQuantity);
    if (categoryID) formData.append("CategoryID", categoryID);
  
    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: image.fileName || "product_image.jpg",
        type: image.type || "image/jpeg",
      });
  
      // **🔹 Add ImageURL field to match the backend**
      formData.append("ImageURL", `http://10.0.2.2:7777/uploads/${image.fileName || "product_image.jpg"}`);
    }
  
    try {
      console.log("Sending FormData:", formData); // Debugging
      const response = await fetch(`${API_URL}/admin/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      const text = await response.text();
      console.log("Raw API Response:", text);
  
      const data = JSON.parse(text);
      if (!response.ok) throw new Error(data.error || "Something went wrong");
  
      alert(data.message);
      setName("");
      setPrice("");
      setStockQuantity("");
      setCategoryID("");
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      <TextInput label="Product Name" value={name} onChangeText={setName} />
      <TextInput
        label="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        label="Stock Quantity"
        value={stockQuantity}
        onChangeText={setStockQuantity}
        keyboardType="numeric"
      />
      <TextInput
        label="Category ID (Optional)"
        value={categoryID}
        onChangeText={setCategoryID}
        keyboardType="numeric"
      />

      <Button mode="contained" onPress={pickImage} style={{ marginTop: 10 }}>
        Select Image
      </Button>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      )}

      <Button mode="contained" onPress={handleAddProduct} style={{ marginTop: 10 }}>
        Add Product
      </Button>
    </View>
  );
}

export default AddProduct;
