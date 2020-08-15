import React from 'react';
import LoaderSrc from 'svgs/logo.svg';
import styled, { keyframes } from 'styled-components';
import themed from '../functions/themed';
import InlineSVG from 'react-inlinesvg';

const RotationAnimation = keyframes`
    100% {
      transform: rotate(360deg);
    }
  `;

const SvgWrapper = styled.div`
  text-align: center;
  svg {
    transform-origin: center;
    max-width: 100%;
    width: 200px;
    height: auto;
    animation: ${RotationAnimation} forwards 500ms infinite;
  }
  margin-bottom: 50px;
`;

const LoaderText = styled.div`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes[4]};
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const Loader = () => {
  return (
    <React.Fragment>
      <SvgWrapper>
        <InlineSVG src={LoaderSrc} />
      </SvgWrapper>
      <LoaderText>LOADING</LoaderText>
    </React.Fragment>
  );
};

export default themed(Loader);
