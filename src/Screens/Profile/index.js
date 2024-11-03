import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Container } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from '../../../Api';

export default () => {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('nameField');
        setUserName(storedName ? storedName : 'Usuário');
      } catch (error) {
        console.error('Erro ao carregar nome do usuário:', error);
      }
    };

    fetchUserName();
  }, []);

   const handleLogoutClick = async () => {
    Alert.alert(
      'Confirmar Logout',
      'Você tem certeza de que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: async () => {
            await Api.logout();
            navigation.reset({
              routes: [{ name: 'telaLogin' }],
            });
          },
        },
      ]
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.profileWrapper}>
        <View style={styles.profileContainer}>
          {/* Exibindo a imagem e o ícone juntos */}
          <View style={styles.imageWrapper}>
            
            <Icon name="user-circle" size={50} color="#FFF" style={styles.iconOverlay} />
            <Image 
              source={{ uri: 'https://www.designi.com.br/images/preview/12161378.jpg' }} // URL da imagem do usuário
              style={styles.profileImage} 
            />
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Seções para Favoritos e Agendamentos */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.section}>
            <Icon name="star" size={30} color="#FFD700" />
            <Text style={styles.sectionText}> Meus Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Appointments')} style={styles.section}>
            <Icon name="calendar" size={30} color="#00BFFF" />
            <Text style={styles.sectionText}> Meus Agendamentos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutClick}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffa07a',
    paddingVertical: 20,
  },
  profileWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative', // Para permitir que a imagem seja posicionada sobre o Icon
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Faz a imagem ficar circular
  },
  iconOverlay: {
    position: 'absolute', // O ícone ficará sobre a imagem
    top: 35, // Ajuste conforme necessário para centralizar o ícone
    left: 35, // Ajuste conforme necessário para centralizar o ícone
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContainer: {
    width: '90%',
    marginVertical: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  logoutButton: {
    marginBottom: 25,
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '95%',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


