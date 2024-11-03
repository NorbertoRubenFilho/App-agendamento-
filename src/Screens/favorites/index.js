import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FavoritesScreen() {
  const [favoriteServices, setFavoriteServices] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const navigation = useNavigation();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true); // Inicia o carregamento
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavoriteServices(favoritesArray);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
    setLoading(false); // Termina o carregamento
  };

  const removeFavorite = async (id) => {
    try {
      const updatedFavorites = favoriteServices.filter((item) => item.id !== id);
      setFavoriteServices(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ServiceDetails', { service: item })}>
      <ImageBackground source={item.image} style={styles.serviceItem}>
        <View style={styles.textOverlay}>
          <Text style={styles.serviceText}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
    
  );

  return (
    <View style={styles.container}  >
      <Text style={styles.title}>Serviços Favoritos</Text>
      {favoriteServices.length > 0 ? (
        <FlatList
        contentContainerStyle={styles.listContent}
          data={favoriteServices}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadFavorites} />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
        <Text style={styles.noFavoritesText}>Você ainda não tem serviços favoritos.</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={loadFavorites}>
            <Text style={styles.refreshButtonText}>Tente atualizar</Text>
          </TouchableOpacity>
         
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'#ffa07a',
  justifyContent:'center',
    alignContent:'center'
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50
    
  },
  listContent: {
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%', 
  },
  serviceItem: {
   height: 120, 
    marginBottom: 15, 
    borderRadius: 15, 
    overflow: 'hidden',
    width: '95%', 
    alignSelf: 'center',
  },
  textOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  noFavoritesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
   emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  refreshButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  refreshButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  
});