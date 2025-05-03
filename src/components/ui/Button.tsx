import styled, { css } from 'styled-components';

interface ButtonProps {
  $primary?: boolean;
  $secondary?: boolean;
  $small?: boolean;
  $large?: boolean;
  $fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-block;
  padding: ${props => props.$small ? '0.5rem 1rem' : props.$large ? '1rem 2rem' : '0.75rem 1.5rem'};
  font-size: ${props => props.$small ? '0.875rem' : props.$large ? '1.125rem' : '1rem'};
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: ${({ theme }) => theme.transitions.medium};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  ${props => props.$primary && css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.primaryHover};
      text-decoration: none;
    }
  `}
  
  ${props => props.$secondary && css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.secondaryHover || props.theme.colors.secondary};
      opacity: 0.9;
      text-decoration: none;
    }
  `}
  
  ${props => !props.$primary && !props.$secondary && css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.primaryLight};
      text-decoration: none;
    }
  `}
`;

export default Button;