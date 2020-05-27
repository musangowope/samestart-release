import React from 'react';
import styled from 'styled-components';
import themed from '../../functions/themed';

const StyledHeadingOne = styled.h1`
  font-size: ${(props) => props.theme.fontSizes[6]};
`;

export const HeadingOne = themed(({ children }) => (
  <StyledHeadingOne>{children}</StyledHeadingOne>
));
const StyledHeadingTwo = styled.h2`
  font-size: ${(props) => props.theme.fontSizes[5]};
`;

export const HeadingTwo = themed(({ children }) => (
  <StyledHeadingTwo>{children}</StyledHeadingTwo>
));

const StyledHeadingThree = styled.h3`
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

export const HeadingThree = themed(({ children }) => (
  <StyledHeadingThree>{children}</StyledHeadingThree>
));

const StyledHeadingFour = styled.h4`
  font-size: ${(props) => props.theme.fontSizes[3]};
`;

export const HeadingFour = themed(({ children }) => (
  <StyledHeadingFour>{children}</StyledHeadingFour>
));

const StyledHeadingFive = styled.h5`
  font-size: ${(props) => props.theme.fontSizes[2]};
`;

export const HeadingFive = themed(({ children }) => (
  <StyledHeadingFive>{children}</StyledHeadingFive>
));
