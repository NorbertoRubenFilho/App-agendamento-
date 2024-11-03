
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AgendamentosScreen() {
  const [schedules, setSchedules] = useState([]);
  const navigation = useNavigation();

  const fetchSchedules = async () => {
    try {
      const storedSchedules = await AsyncStorage.getItem('schedules');
      setSchedules(storedSchedules ? JSON.parse(storedSchedules) : []);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSchedules(); // Atualiza a lista quando a tela recebe foco
    }, [])
  );

  const deleteSchedule = async (index) => {
    try {
      const updatedSchedules = schedules.filter((_, i) => i !== index);
      await AsyncStorage.setItem('schedules', JSON.stringify(updatedSchedules));
      setSchedules(updatedSchedules);
      alert('Agendamento excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  const handleReschedule = (schedule) => {
    navigation.navigate('Services', { service: schedule });
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Meus Agendamentos</Text>
      {schedules.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="calendar-times-o" size={100} color="#FF4500" />
          <Text style={styles.emptyText}>Nenhum agendamento encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={schedules}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.scheduleItem}>
              <View style={styles.scheduleDetails}>
                <Text style={styles.scheduleText}>{`Serviço: ${item.serviceName}`}</Text>
                <Text style={styles.scheduleText}>{`Profissional: ${item.professional}`}</Text>
                <Text style={styles.scheduleText}>{`Data: ${item.date}`}</Text>
                <Text style={styles.scheduleText}>{`Modalidade: ${item.modalidade}`}</Text>
                <Text style={styles.scheduleText}>{`Valor: ${item.valor}`}</Text>
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => deleteSchedule(index)} style={styles.actionButton}>
                  <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleReschedule(item)} style={styles.actionButton}>
                  <Icon name="pencil" size={20} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={schedules.length === 0 ? styles.emptyList : styles.listContainer} // Estiliza a lista com base na quantidade de itens
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffa07a',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 15, 
    textAlign: 'center',
    marginTop: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 20, // Espaço inferior para a lista
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8, // Espaço vertical entre os itens
    borderRadius: 8,
    backgroundColor: '#fff', // Cor de fundo dos itens
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleText: {
    fontSize: 16,
    color: '#333', // Cor do texto
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 10,
  },
});

