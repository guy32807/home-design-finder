import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  $primary?: boolean;
  $secondary?: boolean;
  $outline?: boolean;
  $small?: boolean;
  $large?: boolean;
  $fullWidth?: boolean;
  as?: React.ElementType;
  onClick?: () => void;
  children: React.ReactNode;
}

const ButtonBase = css<ButtonProps>`
  display: inline-block;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: ${props => props.$small ? '0.375rem 0.75rem' : props.$large ? '0.75rem 1.5rem' : '0.5rem 1rem'};
  font-size: ${props => props.$small ? '0.875rem' : props.$large ? '1.125rem' : '1rem'};
  line-height: 1.5;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* Primary Button */
  ${props => props.$primary && css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.primaryDark};
      text-decoration: none;
    }
  `}
  
  /* Secondary Button */
  ${props => props.$secondary && css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.secondaryDark};
      text-decoration: none;
    }
  `}
  
  /* Outline Button */
  ${props => props.$outline && css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.primaryLightest};
      text-decoration: none;
    }
  `}
  
  /* Default Button (if no type specified) */
  ${props => !props.$primary && !props.$secondary && !props.$outline && css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.colors.secondaryDark};
      text-decoration: none;
    }
  `}
`;

const Button = styled.button<ButtonProps>`
  ${ButtonBase}
`;

export default Button;