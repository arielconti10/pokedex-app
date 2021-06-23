import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

import api from '../../services/api';

interface Props {
  pokemonId: number;
}

const Evolutions: React.FC<Props> = props => {
  const { pokemonId } = props;

  const [evolutions, setEvolutions] = useState();

  useEffect(() => {
    api.get(`evolution-chain/${pokemonId}`).then(result => {
      const evolutions = result.data;
      setEvolutions(evolutions);
    });
  }, []);

  // if(evolutions){
  //   console.log(evolutions.chain.evolves_to)
  // }

  return (
    <View>
      {evolutions ? (
        <View />
      ) : // <Text>{evolutions?.chain.evolvest_to[0].species.name}</Text>
      null}
    </View>
  );
};

export default Evolutions;
