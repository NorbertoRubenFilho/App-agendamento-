import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Svg, { Path } from "react-native-svg";
import { Text } from 'react-native';
import { UserContext } from '../contexts/Usercontext';

const TabArea = styled.View`
  height: 60px;
  background-color:#268596;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  border-radius:35px;
  border: 3px solid  #268596; 
  margin-top: -20px;
`;

const AvatarIcon = styled.Image`
width: 24px;
height: 24px;
border-radius: 12px;
`;



export default ({state, navigation}) => {

const { state:user } = useContext(UserContext);

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>

      {/* ICONE DE NAVEGAÇÃO AO HOME */}
      <TabItem onPress={() => goTo('Home')} >
        <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    viewBox="0 0 24 24"
    fill="#FFF"
    style = {{opacity: state.index=== 0? 1:0.5}}
  >
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </Svg>
      </TabItem>

      {/* ICONE DE NAVEGAÇÃO À BUSCA */}
      <TabItem onPress={() => goTo('Search')}>
        <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    viewBox="0 0 24 24"
    fill="#FFF"
    style = {{opacity: state.index=== 1? 1:0.5}}
  >
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </Svg>
      </TabItem>

      {/* ICONE DE NAVEGAÇÃO AO AGENDAMENTO */}
      <TabItemCenter onPress={() => goTo('Appointments')}>
        <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    viewBox="0 0 24 24"
    fill="#268596"
    >
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </Svg>
      </TabItemCenter>

      {/* ICONE DE NAVEGAÇÃO AOS FAVORITOS */}
      <TabItem onPress={() => goTo('Favorites')}>
         <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    viewBox="0 0 24 24"
    fill="#FFF"
    style = {{opacity: state.index=== 3? 1:0.5}}
  >
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </Svg>
      </TabItem>

      {/* ICONE DE PERFIL DO USUÁRIO */}
      <TabItem onPress={() => goTo('Profile')}>

          <Svg xmlns="http://www.w3.org/2000/svg"
           width={36} 
           height={36} 
           viewBox="0 0 24 24"
           fill="#FFF"
           style = {{opacity: state.index=== 4? 1:0.5}}
           >
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </Svg>
  
      </TabItem>

    </TabArea>
  );
};