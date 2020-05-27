import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import themed from '../../../functions/themed';
const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSizes[2]};
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextButton = ({ children, ...restProps }) => {
  return <Button {...restProps}>{children}</Button>;
};

TextButton.propTypes = {
  children: PropTypes.any,
};
TextButton.defaultProps = {
  children: null,
};

export default themed(TextButton);
