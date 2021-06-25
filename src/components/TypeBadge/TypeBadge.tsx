import React, { ReactNode } from 'react';
import { Image } from 'react-native';

import { Container, BadgeName } from './styles';
import { pokemonTypeIcons } from '../../constants/pokemonTypeIcons';

type TypeBadgeProps = {
  backgroundColor: string;
};

const TypeBadge: React.FC<TypeBadgeProps> = ({ backgroundColor, children }) => {
  const icon = pokemonTypeIcons[children];

  return (
    <Container backgroundColor={backgroundColor ? backgroundColor : '#fff'}>
      <Image source={icon} resizeMode="contain" style={{ width: 16 }} />
      <BadgeName>{children}</BadgeName>
    </Container>
  );
};

export default TypeBadge;
