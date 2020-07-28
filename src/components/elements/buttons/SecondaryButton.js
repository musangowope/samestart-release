import React from 'react';
import themed from '../../../functions/themed';
import styled, { css } from 'styled-components';
import { baseButtonStyle } from './PrimaryButton';
import { lighten } from 'polished';
import PropTypes from 'prop-types';

export const secondaryButtonStyle = css`
  ${baseButtonStyle};
  border: 2px solid ${(props) => props.theme.colors.secondary};
  color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.white : theme.colors.tertiary};
  background-color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.secondary : 'transparent'};

  &:hover {
    background-color: ${({ isFilled, theme, disabled }) =>
      isFilled && !disabled
        ? lighten(0.05, theme.colors.secondary)
        : theme.colors.secondary};
    color: ${(props) => props.theme.colors.white};
  }
`;

const Button = styled.button`
  ${secondaryButtonStyle};
`;

const SecondaryButton = (props) => <Button {...props} />;

SecondaryButton.propTypes = {
  isFilled: PropTypes.bool,
};

SecondaryButton.defaultProps = {
  isFilled: false,
};

export default themed(SecondaryButton);
