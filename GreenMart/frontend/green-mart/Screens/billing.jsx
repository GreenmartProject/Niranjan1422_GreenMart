import { View, ScrollView, Image, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

function Billing({ route, navigation }) {
  const cart = route?.params?.cart || [];

  const CheckOut = () => {
    navigation.navigate("go-pay");
  };

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          {cart.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={item.images} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>Price: ₹ {item.price}</Text>
                <Text style={styles.text}>Quantity: {item.quantity}</Text>
                <Text style={styles.totalText}>Total: ₹ {item.price * item.quantity}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      {cart.length > 0 && (
        <Button mode="contained" onPress={CheckOut} style={styles.button}>
          Pay ₹ {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#e6ffe6", // Light green background
  },
  scrollView: { width: "100%" },
  emptyCartText: { fontSize: 18, fontWeight: "bold", margin: 20, color: "#333" },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 2,
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 5 },
  details: { flex: 1 },
  text: { fontWeight: "bold", fontSize: 14, marginVertical: 2, color: "#333" },
  totalText: { fontSize: 16, fontWeight: "bold", color: "green", marginTop: 5 },
  button: { margin: 20, width: 200, backgroundColor: "green" },
});

export default Billing;
