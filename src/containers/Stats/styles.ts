import styled from 'styled-components/native';


interface PokemonProps {
  bgColor: string;
}

export const Container = styled.View`
  
`;


export const StatsContainer = styled.View`
  margin: 20px 0;
  display: flex;
`;

export const StatContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const StatName = styled.Text<PokemonProps>`
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.bgColor};
`;

export const StatValue = styled.Text`
  font-weight: 600;
  color: #666666;
`;
