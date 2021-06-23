import React, { useEffect, useState, useCallback } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { getAttributeShortName } from '../../helpers';
import { RouteParams } from '../../routes';
import api from '../../services/api';

import TypeBadge from '../../components/TypeBadge/TypeBadge';
import Stats from '../../containers/Stats/Stats';
import Evolutions from '../../containers/Evolutions/Evolutions';

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

export type PokemonDataType = {
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
} from './styles';

const Pokemon: React.FC<Props> = ({ route, navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);

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

  const getLength = (number: number) => {
    return number.toString().length;
  };

  /**
   * GET POKEMON DATA
   */
  useEffect(() => {
    setLoading(true);
    const pokemonName = route.params.pokemonName;
    api
      .get(`pokemon/${pokemonName}`)
      .then(result => {
        const pokemonData = result.data;

        setPokemonData(pokemonData);
        setLoading(false);
      })
      .catch(exception => {
        console.log(exception);
      });
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
    if (pokemonData.id) {
      api
        .get(`pokemon-species/${pokemonData.id}`)
        .then(result => {
          setPokemonData({
            ...pokemonData,
            flavor_text: result.data.flavor_text_entries[8].flavor_text,
          });
        })
        .catch(exception => console.log(exception));
    }
  }, [pokemonData]);

  const initialLayout = { width: Dimensions.get('window').width };

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Stats' },
    { key: 'second', title: 'Evolutions' },
    { key: 'third', title: 'Moves' },
  ]);

  const renderScene = SceneMap({
    first: useCallback(
      () => <Stats pokemonData={pokemonData} pokemonColor={pokemonColor} />,
      [pokemonData],
    ),
    second: useCallback(() => <Evolutions pokemonId={pokemonData.id} />, [
      pokemonData.id,
    ]),
    third: MovesTabs,
  });

  const getPokemonId = () => {
    let pokemonId;
    if (pokemonData) {
      pokemonId = pokemonData.id.toString();
      if (pokemonData.id < 10) {
        pokemonId = '00' + pokemonId;
      } else if (pokemonData.id >= 10 && pokemonData.id < 100) {
        pokemonId = '0' + pokemonId;
      }
    }

    return pokemonId;
  };

  return (
    <Container>
      {pokemonData && !loading && (
        <PokemonContainer bgColor={pokemonColor ? pokemonColor : '#fff'}>
          <Image
            style={{
              width: 170,
              height: 170,
              alignSelf: 'center',
              marginBottom: -40,
              zIndex: 1,
            }}
            source={{
              uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getPokemonId()}.png`,
            }}
          />

          <PokemonData>
            <PokemonName>{pokemonData.name}</PokemonName>
            <BadgesTypeContainer>
              {pokemonData.types.map(attribute => (
                <TypeBadge
                  key={attribute.type.name}
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

            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              renderTabBar={props => (
                <TabBar
                  renderLabel={({ route, focused, color }) => (
                    <Text
                      style={{
                        color: color ? color : '#fff',
                        margin: 0,
                        textTransform: 'uppercase',
                      }}
                    >
                      {route.title}
                    </Text>
                  )}
                  indicatorStyle={{
                    borderRadius: 100,
                    height: '100%',
                    backgroundColor: pokemonColor ? pokemonColor : '#fff',
                    borderWidth: 2,
                    borderColor: pokemonColor ? pokemonColor : '#fff',
                    shadowColor: pokemonColor,
                    elevation: 1,
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                  }}
                  activeColor={pokemonColor ? '#fff' : pokemonColor}
                  inactiveColor={pokemonColor ? pokemonColor : '#919191'}
                  {...props}
                  style={{
                    backgroundColor: '#fff',
                    shadowColor: '#fff',
                  }}
                />
              )}
            />
          </PokemonData>
        </PokemonContainer>
      )}
    </Container>
  );
};

export default Pokemon;

const EvolutionTabs = () => (
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
);

const MovesTabs = () => <View style={{ flex: 1, backgroundColor: 'yellow' }} />;
