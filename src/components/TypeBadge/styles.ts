import styled from 'styled-components/native';

interface BadgeProps {
  backgroundColor: string;
}

export const Container = styled.View<BadgeProps>`
  display: flex;
  min-width: 110px;
  height: 30px;
  border-radius: 20px;
  padding: 0 10px;
  background-color: ${props => props.backgroundColor};
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 6px ${props => props.backgroundColor};
  margin: 10px;
  shadow-opacity: 1;
  flex-direction: row;
`;

export const BadgeName = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin-left: 10px;
  align-self: center;
`;
