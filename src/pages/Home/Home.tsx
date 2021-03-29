import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';



import { Container, SearchBar, Title } from './styles';

const Home: React.FC = () => {
  const [searchPokemon, setSearchPokemon] = useState<string>('');

  const handleSearchPokemon = () => {

  }

  return (
    <Container>
      <Title>Pokedéx</Title>

      <SearchBar>
        <TextInput style={{color: '#FFF'}} value={searchPokemon} placeholder="Search" placeholderTextColor="#fff" onChangeText={(value) => setSearchPokemon(value)}/>
      </SearchBar>

    </Container>
  );
}

export default Home;


