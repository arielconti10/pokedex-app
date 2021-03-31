import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Image, Text } from 'react-native';
import {
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';
import debounce from 'lodash.debounce';

import { capitalize } from '../../helpers';
import api from '../../services/api';

import { Container, SearchBar, Title } from './styles';
import { DebouncedFunc, lowerCase } from 'lodash';
import { useNavigation } from '@react-navigation/native';

interface Pokemon {
  name: string;
  url: string;
}

function useDebounce<T>(callback: any, delay: number): DebouncedFunc<any> {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay], // will recreate if delay changes
  );
  return debouncedFn;
}

const Home: React.FC = () => {
  const [searchString, setSearchString] = useState<string>('');

  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const debouncedSave = useDebounce(
    nextValue => setDebouncedSearch(nextValue),
    1000,
  );

  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon>();

  const navigation = useNavigation();

  const getPokemons = () => {
    setLoading(true);
    api.get(`pokemon?limit=10&offset=${offset}`).then(result => {
      setPokemonList(pokemonList => pokemonList.concat(result.data.results));
      setLoading(false);
    });
  };

  const searchPokemon = () => {
    setLoading(true);
    const query = lowerCase(debouncedSearch);
    if (query) {
      setTimeout(() => {
        api
          .get(`pokemon/${query}`)
          .then(result => {
            setSearchedPokemon(result.data);
            setLoading(false);
          })
          .catch(error => console.log(error));
      }, 1000);
    }
  };

  const renderPokemon = (result: { item: Pokemon }) => (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.navigate('Pokemon', { pokemonName: result.item.name });
      }}
    >
      <Image
        style={{ width: 80, height: 80 }}
        source={{
          uri: `https://img.pokemondb.net/sprites/home/normal/${result.item.name}.png`,
        }}
      />
      <Text>{capitalize(result.item.name)}</Text>
    </TouchableOpacity>
  );

  const handleChangeSearch = (value: string) => {
    setSearchString(value);
    debouncedSave(value);
  };

  useEffect(() => {
    getPokemons();
  }, [offset]);

  useEffect(() => {
    searchPokemon();
  }, [debouncedSearch]);

  return (
    <Container>
      <Title>Pokedéx</Title>

      <SearchBar>
        <TextInput
          autoCapitalize="none"
          style={{ color: '#FFF' }}
          value={searchString}
          placeholder="Search"
          placeholderTextColor="#fff"
          onChangeText={value => handleChangeSearch(value)}
        />
      </SearchBar>

      {loading && <ActivityIndicator />}

      {!searchedPokemon ? (
        <FlatList
          keyExtractor={item => item.name}
          data={pokemonList}
          renderItem={renderPokemon}
          onEndReachedThreshold={0}
          onEndReached={() => {
            setTimeout(() => {
              setLoading(true);
              setOffset(offset + 10);
            }, 1500);
          }}
          ListFooterComponent={() => <ActivityIndicator />}
        />
      ) : null}

      {searchedPokemon ? renderPokemon({ item: searchedPokemon }) : null}
    </Container>
  );
};

export default Home;
