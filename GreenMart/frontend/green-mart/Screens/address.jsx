import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handleUseCurrentLocation = () => {
    // Implement location fetching logic here
    console.log("Fetching current location...");
  };

  const handlePlaceOrder = () => {
    console.log("Order Placed with Address:", address, city, pincode);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Address</Text>

      {/* Address Input Fields */}
      <TextInput
        label="Enter Address"
        value={address}
        mode="outlined"
        onChangeText={setAddress}
        style={styles.input}
      />

      <TextInput
        label="Select City"
        value={city}
        mode="outlined"
        onChangeText={setCity}
        style={styles.input}
      />

      <TextInput
        label="Pincode"
        value={pincode}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={setPincode}
        style={styles.input}
      />

      {/* Use Current Location Button */}
      <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
        <Icon name="map-marker-outline" size={20} color="green" />
        <Text style={styles.locationText}> Use Current Location</Text>
      </TouchableOpacity>

      {/* Place Order Button */}
      <Button mode="contained" onPress={handlePlaceOrder} style={styles.placeOrderButton}>
        Place Order
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#E8F5E9",
  },
  locationText: {
    fontSize: 16,
    color: "green",
  },
  placeOrderButton: {
    backgroundColor: "green",
    paddingVertical: 8,
  },
});

export default AddressScreen;
