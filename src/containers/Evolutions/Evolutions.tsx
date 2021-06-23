import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

import api from '../../services/api';

interface Props {
  pokemonId: number;
}

type Evolution = {
  species: {
    name: string,
    url: string
  }
}

type EvolutionChain = {
  chain: {
    evolves_to: Evolution[]
  }
}

const Evolutions: React.FC<Props> = props => {
  const { pokemonId } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [evolutions, setEvolutions] = useState<EvolutionChain>();

  useEffect(() => {
    const fetchPokemonEvolutions = async () => {
      setLoading(true);
      const result = await api.get(`evolution-chain/${pokemonId}`)
      setEvolutions(result.data)
    }
    if(pokemonId){
      fetchPokemonEvolutions();
      setLoading(false);
    }
  }, []);


  return (
    <View>
      {evolutions?.chain ? (
        <View>
          <Text>{evolutions.chain.evolves_to[0].species.name}</Text>
        </View>
      ) : null}

      
    </View>
  );
};

export default Evolutions;
