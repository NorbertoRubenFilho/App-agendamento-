import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
flex: 1;
background-color:#ffa07a;
`;

export const Scroller = styled.ScrollView`
flex: 1;
padding: 20px;
`;

export const HeaderArea = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`;
export const HeaderTitle = styled.Text`
width:250px;
margin-top:30px;
font-size: 26px;
font-weight: Bold;
color: #FFF;
`;
export const SearchButtom = styled.TouchableOpacity`
width: 26px;
height: 26px;
`;


export const LocationArea = styled.View`
background-color:#FFF;
height: 60px;
border-radius:30px;
flex-direction:row;
align-items:center;
padding-left: 20px;
padding-right: 20px;
margin-top: 30px;

`;
export const LocationInput = styled.TextInput`
flex: 1;
font-size: 16px;
color: #000; 
`;
export const LocationFinder = styled.TouchableOpacity`

`;