import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { ReactNode, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { RouteParams } from '../../routes';
import api from '../../services/api';

type PokemonScreenRouteProp = RouteProp<RouteParams, 'Pokemon'>;

type PokemonScreenNavigationProp = StackNavigationProp<RouteParams, 'Pokemon'>;

type Props = {
  route: PokemonScreenRouteProp;
  navigation: PokemonScreenNavigationProp;
};

type StatType = {
  slot: number;
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
};

type AttributeType = {
  slot: number;
  type: {
    name: string;
  };
};

type PokemonDataType = {
  id: number;
  name: string;
  abilities: [];
  moves: [];
  stats: StatType[];
  types: AttributeType[];
};

import { Container, PokemonName } from './styles';

const Pokemon: React.FC = ({ route, navigation }: Props) => {
  const [pokemonData, setPokemonData] = useState<PokemonDataType>();

  useEffect(() => {
    const pokemonName = route.params.pokemonName;
    api
      .get(`pokemon/${pokemonName}`)
      .then(result => setPokemonData(result.data));
  }, []);

  return (
    <Container>
      {pokemonData && (
        <>
          <Image
            style={{ width: 128, height: 128, alignSelf: 'center' }}
            source={{
              uri: `https://img.pokemondb.net/sprites/home/normal/${pokemonData.name}.png`,
            }}
          />
          <PokemonName>{pokemonData.name}</PokemonName>

          {pokemonData.types.map(attribute => (
            <Text>{attribute.type.name}</Text>
          ))}

          {pokemonData.stats.map(stat => (
            <Text>
              {stat.base_stat} - {stat.stat.name}
            </Text>
          ))}
        </>
      )}
    </Container>
  );
};

export default Pokemon;
