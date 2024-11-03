import React from 'react'; 
import {createStackNavigator} from '@react-navigation/stack';

import Preload from '../Screens/preload/index';
import TelaLogin from '../Screens/telalogin';
import FormCadastro from '../Screens/formcadastro';
import MainTab from './MainTab';
import Services from '../Screens/Services/index';
const Stack = createStackNavigator();

export default() => 
 (
  <Stack.Navigator 
  initialRouteName = 'preload'
  screenOptions={{
    headerShown: false,
    }}
  >
   <Stack.Screen name="preload" component={Preload}/>
   <Stack.Screen name="telaLogin" component={TelaLogin}/>
   <Stack.Screen name="formCadastro" component={FormCadastro}/>
   <Stack.Screen name="MainTab" component={MainTab}/>
   <Stack.Screen name="Services" component={Services}/>
  </Stack.Navigator>
  );
  
