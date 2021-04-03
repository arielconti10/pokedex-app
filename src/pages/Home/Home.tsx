import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

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

  const renderPokemon = (result: { item: Pokemon }) => {
    let pokeId = result.index + 1;
    pokeId = pokeId.toString();
    if (pokeId < 10) {
      pokeId = '00' + pokeId;
    } else if (pokeId >= 10 && pokeId < 100) {
      pokeId = '0' + pokeId;
    }
    return (
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
          style={{ width: 70, height: 70 }}
          source={{
            uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeId}.png`,
          }}
        />
        <Text>{capitalize(result.item.name)}</Text>
      </TouchableOpacity>
    );
  };

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
          keyExtractor={(item, index) => index.toString()}
          data={pokemonList}
          renderItem={item => renderPokemon(item)}
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
