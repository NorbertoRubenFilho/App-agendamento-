import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: #dcdcdc;
  flex-direction: row;
  border-radius: 30px;
  padding-left:15px;
  align-items: center;
  margin-bottom: 15px;
`;

const Input = styled.TextInput`
 flex: 1;
 font-size:16px;
 color:#000;
  padding:16px;
  outline:none;
`;

export default ({ placeholder, value, onChangeText, password }) => {
  return (
    <InputArea>
      <Input
        placeholder={placeholder}
        placeholderTextColor="#286596"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  );
};
