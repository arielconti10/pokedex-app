import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import api from '../../services/api';

// import { Container } from './styles';

type Move = {
  is_hidden: boolean;
  name: string;
  url: string;
};

interface MoveDetails extends Move {
  type: [];
  name: string;
  power: number;
  id: number;
}

type Props = {
  moves: [];
};

const Moves: React.FC<Props> = props => {
  const { moves } = props;

  const [movesDetails, setMovesDetails] = useState<MoveDetails[]>([]);

  /**
   * GET MOVES DETAILS
   */
  const getMovesDetails = (move: Move) => {
    api
      .get(`${move.url}`)
      .then(response => {
        setMovesDetails(movesDetails => [...movesDetails, response.data]);
      })
      .catch(exception => console.log(exception));
  };

  useEffect(() => {
    if (moves) {
      moves.map(move => {
        getMovesDetails(move.move);
      });
    }
    return () => {
      setMovesDetails([]);
    };
  }, [moves]);

  return (
    <ScrollView>
      {movesDetails.map(move => (
        <View key={move.name}>
          <Text>{move.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Moves;
