import React from  'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
background-color:#ffa07a;
flex:1;
justify-content:center;
align-items:center;
`;
export const InputArea = styled.SafeAreaView`
padding: 40px;
width:90%;
margin-top:15px;

`;

export const CustomButton = styled.TouchableOpacity`
  height:60px;
  background-color:#268596;
  border-radius:30px;
  justify-content: center;
  align-items: center;
`;
export const CustomButtonText = styled.Text`
  font-size: 18px;
  color:#FFF;
  
`;

export const SignMessageButton = styled.TouchableOpacity`
flex-direction:row;
justify-content: center;
margin-top:50px;
margin-bottom:20px;
`;
export const SignMessageButtonText = styled.Text`
font-size: 16x;
color:#268596;
`;
export const SignMessageButtonTextBold = styled.Text`
font-size: 16px;
color:#000;
font-weight: bold;
margin-left: 5px;
`;