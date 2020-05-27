import React from 'react';
import styled from 'styled-components';
import themed from '../functions/themed';
import TextButton from '../components/elements/buttons/TextButton';
import PropTypes from 'prop-types';

const StyledCircleButton = styled(TextButton)`
  height: 50px;
  width: 50px;
  font-size: ${(props) => props.theme.fontSizes[3]};
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.colors.primary};
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${({ isSelected, theme }) =>
    isSelected
      ? theme.colors.primary
      : (props) => props.theme.colors.white};
  color: ${({ isSelected, theme }) =>
    isSelected
      ? theme.colors.white
      : (props) => props.theme.colors.tertiary};
  transition: 200ms ease-in-out;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
  }
`;

const CircleButton = ({ buttonText, actionCallback, isSelected }) => {
  return (
    <StyledCircleButton
      type="button"
      onClick={actionCallback}
      isSelected={isSelected}
    >
      {buttonText}
    </StyledCircleButton>
  );
};

CircleButton.propTypes = {
  buttonText: PropTypes.string,
  actionCallback: PropTypes.func,
  isSelected: PropTypes.bool,
};
CircleButton.defaultProps = {
  buttonText: '',
  actionCallback: () => false,
  isSelected: false,
};

export default themed(CircleButton);
