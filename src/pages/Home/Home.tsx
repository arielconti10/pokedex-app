import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
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

  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getPokemons = () => {
    api.get(`/pokemon?limit=10&offset=${offset}`).then(
      (result) => {
        setPokemonList(pokemonList => pokemonList.concat(result.data.results));
      }
    );
  }

  useEffect(() => {
    getPokemons();
  }, [offset]);

  console.log(pokemonList);

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
        keyExtractor={(item) => item.name}
        data={pokemonList}
        renderItem={renderPokemon}
        onEndReachedThreshold={0}
        onEndReached={({distanceFromEnd}) => {
          setTimeout(() => {
            setLoading(true);
            setOffset(offset + 10);
          }, 1500)
        }}
        ListFooterComponent={() => <ActivityIndicator />}
      />

    </Container>
  );
}

export default Home;
