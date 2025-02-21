import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const Pulses = [
  { id: 1, name: 'Masoor Dal', price: 60, images: require('../assets/images/masoor.jpg') },
];

export default function PulsesPage(props) {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState(
    Pulses.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );

  const handleIncrease = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const addToCart = (item) => {
    if (quantities[item.id] > 0) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: quantities[item.id] } : cartItem
          );
        }
        return [...prevCart, { ...item, quantity: quantities[item.id] }];
      });
    }
  };

  const goToBilling = () => {
    props.navigation.navigate("billing", { cart });
  };

  const renderPulses = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.images} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}/kg</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id]}</Text>
          <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fresh Pulses</Text>
      {Pulses.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No pulses available.</Text>
      ) : (
        <FlatList
          data={Pulses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPulses}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button mode="contained" onPress={goToBilling} style={styles.cartButton}>
        Go to Cart ({cart.length} items)
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ccffcc', padding: 20 },
  heading: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  flatListContainer: { paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
  },
  image: { width: 100, height: 100, resizeMode: 'cover', borderRadius: 10, marginRight: 10 },
  infoContainer: { flex: 1, justifyContent: 'center' },
  text: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5, marginLeft: 20 },
  price: { fontSize: 14, color: '#666', marginBottom: 10, marginLeft: 20 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  button: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center', marginHorizontal: 8 },
  buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  quantityText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  addButton: { backgroundColor: '#4CAF50', paddingVertical: 10, borderRadius: 5, marginTop: 10, alignItems: 'center', width: 80, marginLeft: 10 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cartButton: { marginTop: 20, backgroundColor: 'green' },
});


