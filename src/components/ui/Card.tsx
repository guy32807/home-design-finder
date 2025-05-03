import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: ${({ theme }) => theme.transitions.medium};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

export default Card;