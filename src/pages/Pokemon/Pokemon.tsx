import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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

import {
  Container,
  PokemonContainer,
  PokemonName,
  PokemonData,
  PokemonDescription,
  BadgesTypeContainer,
  Stats,
  StatContainer,
  StatName,
  StatValue,
} from './styles';

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

  const getAttributeShortName = attribute => {
    switch (attribute) {
      case 'attack':
        return 'AKT';
      case 'defense':
        return 'DEF';
      case 'special-attack':
        return 'SATK';
      case 'special-defense':
        return 'SDEF';
      case 'speed':
        return 'SPD';
      default:
        return attribute;
    }
  };

  return (
    <Container>
      {pokemonData && (
        <PokemonContainer backgroundColor={pokemonColor ? pokemonColor : ''}>
          <Image
            style={{
              width: 128,
              height: 128,
              alignSelf: 'center',
              marginBottom: -20,
              zIndex: 1,
            }}
            source={{
              uri: `https://img.pokemondb.net/sprites/home/normal/${pokemonData.name}.png`,
            }}
          />

          <PokemonData>
            <PokemonName>{pokemonData.name}</PokemonName>
            <BadgesTypeContainer>
              {pokemonData.types.map(attribute => (
                <TypeBadge
                  backgroundColor={getPokemonColor(attribute.type.name)}
                >
                  {getAttributeShortName(attribute.type.name)}
                </TypeBadge>
              ))}
            </BadgesTypeContainer>

            <PokemonDescription>
              {pokemonData.flavor_text
                ? pokemonData.flavor_text.replace(/\s+/g, ' ').trim()
                : ''}
            </PokemonDescription>

            <Stats>
              {pokemonData.stats.map(stat => (
                <StatContainer>
                  <View
                    style={{
                      width: 70,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: 30,
                    }}
                  >
                    <StatName
                      backgroundColor={pokemonColor ? pokemonColor : '#fff'}
                    >
                      {getAttributeShortName(stat.stat.name)}
                    </StatName>
                    <StatValue>{stat.base_stat}</StatValue>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Progress.Bar
                      color={pokemonColor}
                      progress={stat.base_stat / 100}
                      width={240}
                      height={15}
                      borderRadius={20}
                    />
                  </View>
                </StatContainer>
              ))}
            </Stats>
          </PokemonData>
        </PokemonContainer>
      )}
    </Container>
  );
};

export default Pokemon;
