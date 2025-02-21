import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Vegetables', images: require('../assets/images/veg.jpg') },
  { id: 2, name: 'Fruits', images: require('../assets/images/fruits.jpg') },
  { id: 3, name: 'Millets', images: require('../assets/images/millets.jpg') },
  { id: 4, name: 'Pulses', images: require('../assets/images/pulse.jpg') },
];

export default function Home({ navigation }) {
  const [search, setSearch] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = text
      ? categories.filter((item) =>
          item.name.toLowerCase().includes(text.toLowerCase())
        )
      : categories;
    setFilteredCategories(filteredData);
  };

  const handleCategoryClick = (categoryName) => {
    const pageMapping = {
      Vegetables: 'VegetablePage',
      Fruits: 'FruitsPage',
      Millets: 'MilletsPage',
      Pulses: 'PulsesPage',
    };

    if (pageMapping[categoryName]) {
      navigation.navigate(pageMapping[categoryName]);
    } else {
      alert(`No page available for ${categoryName}`);
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCategoryClick(item.name)}>
      <Image source={item.images} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#e6ffe6', '#ccffcc']} style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search categories..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {filteredCategories.length === 0 ? (
        <Text style={styles.noResultsText}>No categories found.</Text>
      ) : (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategory}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginVertical: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#555',
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 15,
    maxWidth: '45%',
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
