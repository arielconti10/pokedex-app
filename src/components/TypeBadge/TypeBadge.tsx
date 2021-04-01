import React, { ReactNode } from 'react';
import { Text } from 'react-native';

import { Container, BadgeName } from './styles';

type TypeBadgeProps = {
  backgroundColor: string;
};

const TypeBadge: React.FC<TypeBadgeProps> = ({ backgroundColor, children }) => {
  return (
    <Container backgroundColor={backgroundColor ? backgroundColor : '#fff'}>
      <BadgeName>{children}</BadgeName>
    </Container>
  );
};

export default TypeBadge;
