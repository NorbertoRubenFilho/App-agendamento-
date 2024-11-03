import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceDetailsScreen({ route }) {
  const { service } = route.params;
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [modalidade, setModalidade] = useState('Presencial');
  const [isFavorited, setIsFavorited] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
        const isFavorite = favoritesArray.some(item => item.id === service.id);
        setIsFavorited(isFavorite);
      } catch (error) {
        console.error('Error checking favorites:', error);
      }
    };
    checkIfFavorited();
  }, [service]);

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      if (isFavorited) {
        const updatedFavorites = favoritesArray.filter(item => item.id !== service.id);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        favoritesArray.push(service);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setSelectedDate(moment(currentDate).format('DD/MM/YYYY HH:mm'));
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const handleSchedule = async () => {
    const newSchedule = {
      serviceId: service.id,
      serviceName: service.name,
      professional: service.professional,
      date: selectedDate,
      modalidade: modalidade,
      valor: modalidade === 'Presencial' ? service.valorPresencial : service.valorOnline,
    };

    try {
      const storedSchedules = await AsyncStorage.getItem('schedules');
      const schedulesArray = storedSchedules ? JSON.parse(storedSchedules) : [];
      schedulesArray.push(newSchedule);
      await AsyncStorage.setItem('schedules', JSON.stringify(schedulesArray));

      setModalVisible(true);
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
    }
  };

  const closeModalAndReturnHome = () => {
    setModalVisible(false);
    navigation.navigate('Appointments', { refresh: true }); // Passa o parâmetro de atualização
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={25} color="#808080" />
      </TouchableOpacity>

      <ImageBackground source={service.image} style={styles.imageBackground}>
        <View style={styles.textOverlay}>
          <View style={styles.header}>
            <Text style={styles.title}>{service.name}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Icon
                name={isFavorited ? 'star' : 'star-o'}
                size={30}
                color={isFavorited ? '#FFD700' : '#FFF'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>{service.description}</Text>
          <Text style={styles.professionalName}>Profissional: {service.professional}</Text>
          <View style={styles.detailsContainer}>
            <TouchableOpacity
              style={[styles.modalidadeButton, modalidade === 'Presencial' && styles.selectedButton]}
              onPress={() => setModalidade('Presencial')}
            >
              <Text style={styles.detailText}>Presencial: {service.valorPresencial}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalidadeButton, modalidade === 'Online' && styles.selectedButton]}
              onPress={() => setModalidade('Online')}
            >
              <Text style={styles.detailText}>Online: {service.valorOnline}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.scheduleButton} onPress={showDateTimePicker}>
            <Text style={styles.scheduleButtonText}>Agendar Atendimento</Text>
          </TouchableOpacity>

          {selectedDate ? (
            <Text style={styles.selectedDateText}>Data e Hora selecionada: {selectedDate}</Text>
          ) : null}

          {selectedDate ? (
            <TouchableOpacity style={styles.confirmButton} onPress={handleSchedule}>
              <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
            </TouchableOpacity>
          ) : null}

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Agendamento Confirmado!</Text>
                <Text style={styles.modalText}>
                  Você agendou para: {selectedDate}, Modalidade: {modalidade}, Valor: {modalidade === 'Presencial' ? service.valorPresencial : service.valorOnline}
                </Text>

                <TouchableOpacity style={styles.closeButton} onPress={closeModalAndReturnHome}>
                  <Text style={styles.closeButtonText}>Ir para Agendamentos </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
    position: 'absolute',
    top: 50, // ajuste conforme necessário
    left: 20, // ajuste conforme necessário
    zIndex: 1,
    
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
 header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width:'100%',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 50,
  },
  description: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 10,
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    minWidth: 220,
    
  },
  
  selectedButton: {
    backgroundColor: '#00FF00',
  },
  detailText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  scheduleButton: {
   minHeight: 60,
   minWidth: 250,
  backgroundColor:'#268596',
  borderRadius:'30px',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  },
  scheduleButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedDateText: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 16,
  },
  confirmButton: {
   minHeight: 60,
   minWidth: 250,
  backgroundColor:'#268596',
  borderRadius:'30px',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  },
  confirmButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  professionalName: {
    fontSize: 18,
    marginTop: 10,
    color: '#FFF',
  },
});
