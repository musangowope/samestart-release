import themed from '../../../functions/themed';
import React from 'react';
import { baseButtonStyle } from './PrimaryButton';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PropTypes from 'prop-types';

export const tertiaryButtonStyle = css`
  ${baseButtonStyle};
  border: 2px solid ${(props) => props.theme.colors.tertiary};
  color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.white : theme.colors.tertiary};
  background-color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.tertiary : 'transparent'};

  &:hover {
    background-color: ${({ isFilled, theme, disabled }) =>
      isFilled && !disabled
        ? lighten(0.05, theme.colors.tertiary)
        : theme.colors.tertiary};
    color: ${(props) => props.theme.colors.white};
  }
`;

const Button = styled.button`
  ${tertiaryButtonStyle};
`;

const TertiaryButton = (props) => <Button {...props} />;

TertiaryButton.propTypes = {
  isFilled: PropTypes.bool,
};

TertiaryButton.defaultProps = {
  isFilled: false,
};

export default themed(TertiaryButton);
