import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Container, SearchBar, Title } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Title>Pokedéx</Title>

      <SearchBar>
        <TextInput placeholder="Search" placeholderTextColor="#fff" />
      </SearchBar>

    </Container>
  );
}

export default Home;


