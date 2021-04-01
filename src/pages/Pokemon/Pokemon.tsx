import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Progress from 'react-native-progress';

import { RouteParams } from '../../routes';
import api from '../../services/api';
import TypeBadge from '../../components/TypeBadge/TypeBadge';

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
  flavor_text: string;
};

import { Container, PokemonName } from './styles';

const Pokemon: React.FC = ({ route, navigation }: Props) => {
  const [pokemonData, setPokemonData] = useState<PokemonDataType>({
    id: 0,
    abilities: [],
    moves: [],
    stats: [],
    name: '',
    types: [],
    flavor_text: '',
  });
  const [pokemonColor, setPokemonColor] = useState('');

  const getPokemonColor = (pokemonType: string) => {
    return pokemonColorTypes[pokemonType as keyof typeof pokemonColorTypes];
  };

  /**
   * GET POKEMON DATA
   */
  useEffect(() => {
    const pokemonName = route.params.pokemonName;
    api
      .get(`pokemon/${pokemonName}`)
      .then(result => setPokemonData(result.data));
  }, []);

  /**
   * SET POKEMON PRIMARY COLOR
   */
  useEffect(() => {
    if (pokemonData.types.length > 0) {
      const color = getPokemonColor(pokemonData?.types[0].type.name as string);
      setPokemonColor(color);
    }
  }, [pokemonData]);

  /**
   * GET FLAVOR TEXT OF POKEMON
   */
  useEffect(() => {
    api.get(`pokemon-species/${pokemonData?.id}`).then(result => {
      setPokemonData({
        ...pokemonData,
        flavor_text: result.data.flavor_text_entries[8].flavor_text,
      });
    });
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

          <View>
            <Text>{pokemonData.flavor_text}</Text>
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            {pokemonData.types.map(attribute => (
              <TypeBadge backgroundColor={getPokemonColor(attribute.type.name)}>
                {attribute.type.name}
              </TypeBadge>
            ))}
          </View>

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
