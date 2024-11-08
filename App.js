import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UserContextProvider from './src/contexts/Usercontext';
import MainStack from './src/Stacks/MainStack';

export default () => {
  return (
        <UserContextProvider >
        <NavigationContainer>
            <MainStack/>
        </NavigationContainer>
        </UserContextProvider>
  );
}






