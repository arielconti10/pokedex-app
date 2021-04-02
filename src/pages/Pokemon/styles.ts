import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface PokemonProps {
  backgroundColor: string;
}

export const Container = styled.View`
  display: flex;
`;

export const PokemonContainer = styled.View`
  padding-top: ${getStatusBarHeight() + 24}px;
`;

export const PokemonData = styled.View`
  background: #fff;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 40px;
  width: 100%;
`;

export const PokemonName = styled.Text`
  font-size: 36px;
  text-align: center;
  margin: 25px 0;
  text-transform: capitalize;
`;

export const PokemonDescription = styled.Text`
  padding: 0;
  margin: 0;
  font-size: 14px;
  text-align: left;
  color: #4f4f4f;
  margin: 30px 0;
`;

export const BadgesTypeContainer = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const Stats = styled.View`
  margin-top: 20px;
  display: flex;
`;

export const StatContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StatName = styled.Text<PokemonProps>`
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.backgroundColor};
`;

export const StatValue = styled.Text`
  font-weight: 600;
  color: #666666;
`;
