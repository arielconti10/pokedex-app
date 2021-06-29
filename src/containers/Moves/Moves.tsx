import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import api from '../../services/api';
import { pokemonTypeIcons } from '../../constants/pokemonTypeIcons';

import { Row } from './styles';

type Move = {
  is_hidden: boolean;
  name: string;
  url: string;
};

type MoveType = {
  name: string;
  url: string;
};

interface MoveDetails extends Move {
  type: MoveType;
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
      {movesDetails.map(move => {
        const icon = pokemonTypeIcons.normal;

        return (
          <Row key={move.name}>
            <Text>{move.name}</Text>
            <Image source={icon} resizeMode="contain" style={{ width: 16 }} />
          </Row>
        );
      })}
    </ScrollView>
  );
};

export default Moves;
