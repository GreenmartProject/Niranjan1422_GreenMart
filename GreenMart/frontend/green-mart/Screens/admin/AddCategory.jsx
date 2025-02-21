import React, { useState } from "react";
import { View, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";

const API_URL = "http://localhost:7777";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
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

  const handleAddCategory = async () => {
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }
  
    const formData = new FormData();
    formData.append("CategoryName", categoryName);
    
    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: image.fileName || "category.jpg",
        type: image.type || "image/jpeg",
      });
    }
  
    try {
      const response = await fetch(`${API_URL}/admin/addproductcategory`, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
  
      const data = await response.json();
      alert(data.message);
      setCategoryName("");
      setImage(null);
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
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

      <Button mode="contained" onPress={handleAddCategory} style={{ marginTop: 10 }}>
        Add Category
      </Button>
    </View>
  );
}

export default AddCategory;
