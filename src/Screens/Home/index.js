import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Container, Scroller, HeaderArea, HeaderTitle, SearchButtom, LocationArea, LocationInput, LocationFinder } from './styles';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();
  const [locationText, setLocationText] = useState('');

  const services = [
   { id: '1', 
    name: 'Avaliação Terapêutica',
    image: require('../../assets/terapia2.jpg'), 
    description: 'avaliação inicial com profissional',
    professional: 'Rosângela Freitas ',
    valorPresencial: 'R$250,00', 
    valorOnline: 'não disponível'},
   
   { id: '2', 
    name: 'Terapia Floral', 
    image: require('../../assets/florais.jpg'), 
    description: 'Uma técnica de cura baseada no uso de essências florais.',
    professional: 'Rosângela Freitas ',
    valorOnline: 'R$50,00', 
    valorPresencial: 'R$100,00'},

    { id: '3', 
    name: 'Reiki', 
    image: require('../../assets/reikitratamento.jpg'), 
    description: 'Terapia energética que utiliza a imposição de mãos.',
    professional: 'Humberto Brevilato ',
    valorPresencial: 'R$150,00', 
    valorOnline: 'R$200,00'  },

    { id: '4',
     name: 'Barra De Access', 
     image: require('../../assets/barrasAccess.jpg'), 
     description: 'Método de liberação de crenças limitantes.', 
     professional: 'Rosângela Freitas ',
     valorPresencial: 'R$150,00', 
     valorOnline: 'R$100,00'
     }, 

    { id: '5', 
    name: 'Alinhamento de Chakras', 
    image: require('../../assets/alinhamentodechackras.jpg'), 
    description: 'Equilibrar os chakras para melhorar o bem-estar.',
    professional: 'Rosângela freitas',
    valorPresencial: 'R$100,00', 
    valorOnline: 'R$150,00'
    },

    { id: '6', 
    name: 'Cromoterapia', 
    image: require('../../assets/cromo.jpg'),
    description: 'Terapia que utiliza as cores para curar.',
    professional: 'Adreia Jacobina',
    valorPresencial: 'R$100,00', 
    valorOnline: 'R$150,00'
    },

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
    valorOnline: 'Não disponível'
   },

    { id: '9',
     name: 'Nutrição Integrativa', 
     image: require('../../assets/nutricao.jpg'),  
     description: 'Abordagem holística à nutrição.',
     professional: 'Dr: Marco Antônio Quintarelli ',
     valorPresencial: 'R$250,00', 
    valorOnline: 'R$150,00' },
    
  ];

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
          <HeaderTitle>
            Nossos Serviços a sua Disposição, 
          Agende sua Consulta Aqui. 
          </HeaderTitle>
          <SearchButtom onPress={() => navigation.navigate('Search')}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={26}
              height={26}
              viewBox="0 0 24 24"
              fill="#FFF"
            >
              <Path fill="none" d="M0 0h24v24H0z" />
              <Path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </Svg>
          </SearchButtom>
        </HeaderArea>

        {/* AREA PRINCIPAL DA HOME */}
        <LocationArea>
          <LocationInput 
            placeholder="Onde você está agora?"
            placeholderTextColor="#DCDCDC"
            value={locationText}
            onChangeText={t => setLocationText(t)}
          />
          <LocationFinder>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={36}
              height={36}
              viewBox="0 0 24 24"
              fill="#3e3636"
            >
              <Path fill="none" d="M0 0h24v24H0z" />
              <Path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </Svg>
          </LocationFinder>
        </LocationArea>

        {/* FlatList - Lista de serviços */}
        <FlatList 
          data={services} 
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
});
