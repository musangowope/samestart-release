import React from 'react';
import styled from 'styled-components';
import themed from '../functions/themed';

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  margin-bottom: 10px;
`;

export default themed(ErrorMessage);
