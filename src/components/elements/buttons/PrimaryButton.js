import React from 'react';
import themed from '../../../functions/themed';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const baseButtonStyle = css`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes[2]};
  transition: 200ms ease-in-out;
  border-radius: 30px;
  padding: 10px 20px;
  &:disabled {
    opacity: 0.5;
  }
`;

export const primaryButtonStyles = css`
  ${baseButtonStyle};
  border: 2px solid ${(props) => props.theme.colors.primary};
  color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.white : theme.colors.tertiary};
  background-color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.primary : 'transparent'};
  &:hover {
    background-color: ${({ isFilled, theme, disabled }) =>
      isFilled && !disabled
        ? lighten(0.05, theme.colors.primary)
        : theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
  }
`;

const Button = styled.button`
  ${primaryButtonStyles}
`;

const PrimaryButton = (props) => <Button {...props} />;

PrimaryButton.defaultProps = {
  isFilled: false,
};

export default themed(PrimaryButton);
