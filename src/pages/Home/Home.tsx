import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { capitalize } from '../../helpers';
import api from '../../services/api';

import { Container, SearchBar, Title } from './styles';

interface Pokemon{
  name: string,
  url: string
}

const Home: React.FC = () => {
  const [searchPokemon, setSearchPokemon] = useState<string>('');
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    api.get('/pokemon?limit=10').then(
      (result) => {
        setPokemonList(result.data.results);
      }
    );
  }, [])


  const renderPokemon = (result: { item: Pokemon }) => (
    <TouchableOpacity style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <Image
          style={{width: 80, height: 80}}
          source={{
            uri: `https://img.pokemondb.net/sprites/home/normal/${
              result.item.name
            }.png`,
          }}
        />
      <Text>{capitalize(result.item.name)}</Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Title>Pokedéx</Title>

      <SearchBar>
        <TextInput style={{color: '#FFF'}} value={searchPokemon} placeholder="Search" placeholderTextColor="#fff" onChangeText={(value) => setSearchPokemon(value)}/>
      </SearchBar>

      <FlatList
        data={pokemonList}
        renderItem={renderPokemon}
      />

    </Container>
  );
}

export default Home;
