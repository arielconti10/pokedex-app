import React from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';

import {PokemonDataType} from '../../pages/Pokemon/Pokemon';
import { getAttributeShortName } from '../../helpers';

import { StatsContainer, StatContainer, StatName, StatValue } from './styles';

interface Props {
  pokemonData: PokemonDataType;
  pokemonColor: string;
}

const Stats: React.FC<Props> = (props) => {
  const { pokemonData, pokemonColor } = props;
  return (
    <StatsContainer>
      {pokemonData.stats.map(stat => (
        <StatContainer key={stat.stat.name}>
          <View
            style={{
              width: 70,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 30,
            }}
          >
            <StatName bgColor={pokemonColor ? pokemonColor : '#fff'}>
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
    </StatsContainer>
  );
}

export default Stats;