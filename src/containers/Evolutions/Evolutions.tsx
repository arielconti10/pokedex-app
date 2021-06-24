import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import { getPokemonId } from '../../helpers';
import api from '../../services/api';

interface Props {
  pokemonId: number;
  evolutionChain: string;
}

type Evolution = {
  id: string;
  species: {
    name: string;
  };
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
      official_artwork: {
        front_default: string;
      };
    };
  };
};

const Evolutions: React.FC<Props> = props => {
  const { pokemonId, evolutionChain } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);

  useEffect(() => {
    const fetchPokemonEvolutions = async () => {
      setLoading(true);
      const result = await api.get(evolutionChain);
      const first = result.data.chain;
      let second;
      let third;

      let evos = [];

      if (first) {
        const evo1 = await api.get(`pokemon/${first.species.name}`);
        second = first.evolves_to[0];
        evos.push(evo1.data);
      }

      if (second) {
        const evo2 = await api.get(`pokemon/${second.species.name}`);
        third = second.evolves_to[0];
        evos.push(evo2.data);
      }

      if (third) {
        const evo3 = await api.get(`pokemon/${third.species.name}`);
        evos.push(evo3.data);
      }

      setEvolutions(evos);
    };
    if (evolutionChain && pokemonId) {
      fetchPokemonEvolutions();
      setLoading(false);
    }

    return () => {
      setEvolutions([]);
    };
  }, [pokemonId, evolutionChain]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {evolutions && evolutions.length
        ? evolutions.map(evolution => {
            return (
              <View key={evolution.id} style={{ alignItems: 'center' }}>
                <Image
                  style={{
                    width: 85,
                    height: 85,
                  }}
                  source={{
                    uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getPokemonId(
                      evolution,
                    )}.png`,
                  }}
                />
                <Text>{evolution.species.name}</Text>
              </View>
            );
          })
        : null}
    </View>
  );
};

export default Evolutions;
