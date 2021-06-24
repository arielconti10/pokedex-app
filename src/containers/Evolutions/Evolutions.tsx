import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

// import { Container } from './styles';
import { getPokemonId } from '../../helpers';
import api from '../../services/api';

interface Props {
  pokemonId: number;
}

type Species = {
  name: string;
  url: string;
};

type EvolutionDetail = {
  min_level: number;
};

type Evolution = {
  species: {
    name: string;
    url: string;
  };
  evolution_details: EvolutionDetail[];
};

type EvolutionChain = {
  chain: {
    evolves_to: Evolution[];
    species: Species;
  };
};

const renderEvolution = (pokemonId: number) => {
  const pokemonData = {
    id: pokemonId,
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <Image
          style={{
            width: 85,
            height: 85,
          }}
          source={{
            uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getPokemonId(
              pokemonData,
            )}.png`,
          }}
        />
        <Text>Bulbasaur</Text>
      </View>
      <View>
        <Text>lvl 16</Text>
      </View>
      <View>
        <Image
          style={{
            width: 85,
            height: 85,
          }}
          source={{
            uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getPokemonId(
              pokemonData,
            )}.png`,
          }}
        />
        <Text>Ivybasaur</Text>
      </View>
    </View>
  );
};

const Evolutions: React.FC<Props> = props => {
  const { pokemonId } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [evolutions, setEvolutions] = useState<EvolutionChain>();

  useEffect(() => {
    const fetchPokemonEvolutions = async () => {
      setLoading(true);
      const result = await api.get(`evolution-chain/${pokemonId}`);
      setEvolutions(result.data);
    };
    if (pokemonId) {
      fetchPokemonEvolutions();
      setLoading(false);
    }
  }, []);

  return <View>{renderEvolution(pokemonId)}</View>;
};

export default Evolutions;
