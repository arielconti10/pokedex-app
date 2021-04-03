import React, { useEffect, useState } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Progress from 'react-native-progress';

import { RouteParams } from '../../routes';
import api from '../../services/api';
import { getAttributeShortName } from '../../helpers';
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

import electric from '../../assets/icons/electric.png';

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

  const getLength = (number: number) => {
    return number.toString().length;
  };

  /**
   * GET POKEMON DATA
   */
  useEffect(() => {
    const pokemonName = route.params.pokemonName;
    api.get(`pokemon/${pokemonName}`).then(result => {
      const pokemonData = result.data;

      setPokemonData(pokemonData);
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
    api.get(`pokemon-species/${pokemonData?.id}`).then(result => {
      setPokemonData({
        ...pokemonData,
        flavor_text: result.data.flavor_text_entries[8].flavor_text,
      });
    });
  }, [pokemonData]);

  const initialLayout = { width: Dimensions.get('window').width };

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Stats' },
    { key: 'second', title: 'Evolutions' },
    { key: 'third', title: 'Moves' },
  ]);

  const renderScene = SceneMap({
    first: () => (
      <StatsTabs pokemonData={pokemonData} pokemonColor={pokemonColor} />
    ),
    second: EvolutionTabs,
    third: MovesTabs,
  });

  return (
    <Container>
      {pokemonData && (
        <PokemonContainer backgroundColor={pokemonColor ? pokemonColor : ''}>
          <Image
            style={{
              width: 170,
              height: 170,
              alignSelf: 'center',
              marginBottom: -40,
              zIndex: 1,
            }}
            source={{
              uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
                pokemonData.id.toString().length <= 2
                  ? '00' + pokemonData.id
                  : pokemonData.id
              }.png`,
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

            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              renderTabBar={props => (
                <TabBar
                  renderLabel={({ route, focused, color }) => (
                    <Text
                      style={{ color, margin: 0, textTransform: 'uppercase' }}
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
                    padding: 0,
                    margin: 0,
                    borderBottomWidth: 0,
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

const StatsTabs = (props: {
  pokemonData: PokemonDataType;
  pokemonColor: string;
}) => {
  const { pokemonData, pokemonColor } = props;
  return (
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
            <StatName backgroundColor={pokemonColor ? pokemonColor : '#fff'}>
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
  );
};

const EvolutionTabs = () => (
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
);

const MovesTabs = () => <View style={{ flex: 1, backgroundColor: 'yellow' }} />;
