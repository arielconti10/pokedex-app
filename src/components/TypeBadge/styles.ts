import styled from 'styled-components/native';

interface BadgeProps {
  backgroundColor: string;
}

export const Container = styled.View<BadgeProps>`
  width: 110px;
  height: 30px;
  border-radius: 20px;
  background-color: ${(props) => props.backgroundColor};
`;
