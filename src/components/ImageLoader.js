import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import themed from '../functions/themed';
import { transparentize } from 'polished';

const BlockLoader = ({ width, height }) => {
  return <StyledLoaderAnimation width={width} height={height} />;
};

const LoaderAnimation = keyframes`
0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const StyledLoaderAnimation = styled.div`
  background-color: ${(props) =>
    transparentize(0.95, props.theme.colors.baseColor)};
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  &::after {
    content: '';
    display: block;
    background-color: ${(props) =>
      transparentize(0.95, props.theme.colors.grey)};
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: translateX(0);
    animation: 1.5s ${LoaderAnimation} ease-in-out infinite;
  }
`;

export default themed(BlockLoader);

BlockLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

BlockLoader.defaultProps = {
  width: '100%',
  height: '100%',
};
