import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Admin({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header }>Green Mart</Text>

      
      <View style={styles.buttonContainer}>
        <Card style={styles.cardButton}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("productList")}>
            <Icon name="view-list" size={24} color="green" />
            <Text style={styles.buttonText}>All Products</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.cardButton}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("categoryList")}>
            <Icon name="view-list" size={24} color="green" />
            <Text style={styles.buttonText}>All Categories</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.cardButton}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("userList")}>
            <Icon name="account" size={24} color="green" />
            <Text style={styles.buttonText}>Users</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.cardButton}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("addProduct")}>
            <Icon name="plus-circle-outline" size={24} color="green" />
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.cardButton}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("addCategory")}>
            <Icon name="note-plus-outline" size={24} color="green" />
            <Text style={styles.buttonText}>Category</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.logoutCard}>
          <TouchableOpacity style={styles.button} onPress={() => console.log("login")}>
            <Icon name="logout" size={24} color="green" />
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </Card>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>Design By </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FFF1",
    alignItems: "center",
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color:"green"
  },
  buttonContainer: {
    width: "90%",
    alignItems: "center",
  },
  cardButton: {
    width: "90%",
    marginVertical: 5,
    backgroundColor: "#E9F5E9",
    borderRadius: 10,
    padding: 10,
  },
  logoutCard: {
    width: "90%",
    marginVertical: 10,
    backgroundColor: "#FFEBE8",
    borderRadius: 10,
    padding: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "600",
    color: "black",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
  },
});

export default Admin;
