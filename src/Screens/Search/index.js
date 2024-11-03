import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Container, Scroller, HeaderArea, HeaderTitle, LocationArea, LocationInput, LocationFinder } from './styles';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  const services = [
    { id: '1', 
    name: 'Avaliação Terapêutica', 
    image: require('../../assets/terapia2.jpg'), 
    description: 'avaliação inicial com profissional', 
    professional: 'Rosângela Freitas ', 
    valorPresencial: 'R$250,00', 
    valorOnline: 'não disponível' },
{ id: '2', 
    name: 'Terapia Floral', 
    image: require('../../assets/florais.jpg'), 
    description: 'Uma técnica de cura baseada no uso de essências florais',    professional: 'Rosângela Freitas ', 
    valorOnline: 'R$50,00',
     valorPresencial: 'R$100,00' },

    { id: '3',
     name: 'Reiki', 
     image: require('../../assets/reikitratamento.jpg'), 
     description: 'Terapia energética que utiliza a imposição de mãos.',  
     professional: 'Humberto Brevilato',   
      valorPresencial: 'R$150,00', 
     valorOnline: 'R$200,00' },

    { id: '4',
     name: 'Barra De Access',
      image: require('../../assets/barrasAccess.jpg'), 
      description: 'Método de liberação de crenças limitantes.', 
      professional: 'Rosângela Freitas ', 
      valorPresencial: 'R$150,00',
       valorOnline: 'R$100,00' },

    { id: '5',
    name: 'Alinhamento de Chakras', 
   image: require('../../assets/alinhamentodechackras.jpg'), 
 description: 'Equilibrar os chakras para melhorar o bem-estar.',         professional: 'Andreia Jacobina', 
   valorPresencial: 'R$100,00',
    valorOnline: 'R$150,00' },

    { id: '6', 
  name: 'Cromoterapia', 
  image: require('../../assets/cromo.jpg'), 
  description: 'Terapia que utiliza as cores para curar.', 
  professional: 'Andreia jacobina ', 
  valorPresencial: 'R$100,00', 
  valorOnline: 'R$150,00' },

    { id: '7', 
  name: 'Aromaterapia',
   image: require('../../assets/Aromaterapia_Capa.png'), 
   description: 'Uso de óleos essenciais para promover saúde.', 
   professional: 'Rosângela freitas ', 
   valorPresencial: 'R$100,00', 
   valorOnline: 'R$150,00' },

    { id: '8',
    name: 'Massoterapia', 
    image: require('../../assets/massoterapia.jpg'), 
    description: 'Terapia através de técnicas de massagem.',
    professional: 'Luis Gôuveia', 
    valorPresencial: 'R$200,00', 
    valorOnline: 'Não disponível' },

    { id: '9',
     name: 'Nutrição Integrativa',
   image: require('../../assets/nutricao.jpg'), 
   description: 'Abordagem holística à nutrição.', 
   professional: 'Dr: Marco Antônio Quintarelli',
   valorPresencial: 'R$250,00', 
   valorOnline: 'R$150,00' },
   
   {id:'10',
      name:'Psicanálise Clínica',
      image: require('../../assets/psych.jpg'),
      description:'psicologia voltada para a mente humana e os sentimentos ',
      professional:'Rose Neves',
      valorPresencial:'R$300,00',
      valorOnline:'R$250,00',
    },

    { id: '11',
     name: 'Hipnose Clínica', 
     image: require('../../assets/Hipnose.jpg'),  
     description: 'A hipnose clínica é uma técnica terapêutica que utiliza estados de transe para ajudar na modificação de comportamentos',
     professional: 'Rosângela Freitas',
     valorPresencial: 'R$250,00', 
    valorOnline: 'R$100,00' },

    {id: '12',
    name:'Constelação familiar',
    image: require('../../assets/familiar.jpg'),
    description: 'Processo de autoconhecimento através por meio de ancestralidade',
      professional:' Rose Neves',
      valorPresencial: 'R$250,00',
      valorOnline:'R$150,00',
    },

    {id:'13',
    name:'ThetaHealing',
    image: require('../../assets/Theta.jpg'),
    description: 'ThetaHealing é uma técnica de meditação que é possível alterar o ciclo de ondas cerebrais',
    professional:'Andreia Jacobina',
    valorPresencial:'R$250,00',
    valorOnline: '150,00',
     },

     {id:'14',
    name:'Auriculoterapia',
    image: require('../../assets/auriculoterapia.jpg'),
    description: 'técnica terapêutica que consiste em estimular pontos específicos da orelha para tratar problemas de saúde.',
    professional:'Rosângela Freitas',
    valorPresencial:'R$200,00',
    valorOnline: 'Não disponível',
     },

     {id:'15',
    name:'Radiestesia Radiônica',
    image: require('../../assets/radionica.png'),
    description: 'técnica que se baseia na capacidade de medir e detectar campos energéticos de forma extrassensorial',
    professional:'Humberto Brevilato',
    valorPresencial:'R$200,00',
    valorOnline: 'R$150,00',
     },
    
  ];

  // Efeito para filtrar serviços quando a busca muda
  useEffect(() => {
    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchText]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Services', { service: item, professional: item.professional })}>
      <ImageBackground 
        source={item.image}
        imageStyle={styles.imageBackground}
        style={styles.serviceItem}
      >
        <View style={styles.textOverlay}>
          <Text style={styles.serviceText}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Scroller>

        {/* CABEÇALHO DA PÁGINA HOME */}
        <HeaderArea>
          <HeaderTitle  numberOfLines={2}>
          <Text>
         Encontre o tratamento que deseja 
          </Text>
          </HeaderTitle>
        </HeaderArea>

{/* INPUT DE BUSCA */}
        <LocationArea style={styles.searchArea}>
          <LocationInput 
            placeholder="Buscar Serviços "
            placeholderTextColor="#DCDCDC"
            value={searchText}
            onChangeText={t => setSearchText(t)}
          />
        </LocationArea>

        {/* FlatList - Lista de serviços */}
        <FlatList 
          data={filteredServices.length > 0 ? filteredServices : services} 
          renderItem={renderItem} 
          keyExtractor={item => item.id} 
          style={{ marginTop: 10 }} // Estilo opcional
        />
      </Scroller>
    </Container>
  );
}

const styles = StyleSheet.create({
  serviceItem: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
    minHeight: 100,
    elevation: 3, 
    justifyContent: 'center',  
    alignItems: 'center',
  },
  serviceText: {
    fontSize: 24,
    fontWeight: 'bold', 
    color: '#000',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
  },
  textOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    padding: 10,  
    borderRadius: 5,  
    alignItems: 'center',  
    justifyContent: 'center',  
  },
  imageBackground: {
    borderRadius: 10, 
    resizeMode: 'cover',  
  },
  searchArea: {
    marginTop: 15,
  },
});


