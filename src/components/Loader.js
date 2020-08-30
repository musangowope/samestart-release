import React from 'react';
import LoaderSrc from 'svgs/logo.svg';
import styled, { keyframes, css } from 'styled-components';
import themed from '../functions/themed';
import InlineSVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';

const RotationAnimation = keyframes`
    100% {
      transform: rotate(360deg);
    }
  `;

const FadeIn = keyframes`
  0% {
      opacity: 0;
    }
  
  100% {
      opacity: 1;
    }
`;

const LoaderContainer = styled.div`
  position: relative;
  animation: ${FadeIn} 300ms ease-in forwards;
  ${(props) =>
    props.overlay &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;

      .same-start-loader__body__text {
        color: ${(props) => props.theme.colors.white};
      }
    `}
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

const LoaderContainerBody = styled.div`
  position: relative;
  z-index: 9;
`;

const LoadingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${(props) =>
    transparentize(0.5, props.theme.colors.tertiary)};
`;

const LoaderText = styled.div`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes[4]};
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const Loader = ({ overlay, loadingText }) => {
  return (
    <LoaderContainer overlay={overlay} className="same-start-loader">
      {overlay && (
        <LoadingBackground className="same-start-loader__overlay" />
      )}
      <LoaderContainerBody className="same-start-loader__body">
        <SvgWrapper className="same-start-loader__body__svg-wrapper">
          <InlineSVG src={LoaderSrc} />
        </SvgWrapper>
        <LoaderText className="same-start-loader__body__text">
          {loadingText}
        </LoaderText>
      </LoaderContainerBody>
    </LoaderContainer>
  );
};

export default themed(Loader);

Loader.propTypes = {
  overlay: PropTypes.bool,
  loadingText: PropTypes.string,
};

Loader.defaultProps = {
  overlay: false,
  loadingText: 'LOADING',
};
