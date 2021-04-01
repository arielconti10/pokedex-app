import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Progress from 'react-native-progress';

import { RouteParams } from '../../routes';
import api from '../../services/api';
import { pokemonColorTypes } from '../../constants/pokemonTypes';

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
  const [pokemonColor, setPokemonColor] = useState('');

  const getPokemonColor = (pokemonType: string) => {
    return pokemonColorTypes[pokemonType as keyof typeof pokemonColorTypes];
  };

  useEffect(() => {
    const pokemonName = route.params.pokemonName;
    api
      .get(`pokemon/${pokemonName}`)
      .then(result => setPokemonData(result.data));
  }, []);

  useEffect(() => {
    const color = getPokemonColor(pokemonData?.types[0].type.name as string);
    console.log(color);
    setPokemonColor(color);
  }, [pokemonData]);

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
              {stat.stat.name}
              {stat.base_stat}
              <Progress.Bar
                height={10}
                color={pokemonColor}
                progress={stat.base_stat / 100}
                width={200}
                useNativeDriver={true}
              />
            </Text>
          ))}
        </>
      )}
    </Container>
  );
};

export default Pokemon;
