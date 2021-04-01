import styled from 'styled-components/native';

interface BadgeProps {
  backgroundColor: string;
}

export const Container = styled.View<BadgeProps>`
  display: flex;
  width: 110px;
  height: 30px;
  border-radius: 20px;
  background-color: ${props => props.backgroundColor};
  justify-content: center;
  box-shadow: 1px 1px 6px ${props => props.backgroundColor};
  margin: 10px;
  shadow-opacity: 1;
`;

export const BadgeName = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  align-self: center;
`;
