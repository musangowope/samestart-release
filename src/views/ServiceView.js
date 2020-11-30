import React from 'react';
import themed from '../functions/themed';
import queryString from 'query-string';
import serviceConstants from '../constants/serviceConstants';
import styled from 'styled-components';
import LogoSrc from '../svgs/logo.svg';
import AnimationContainer from '../components/AnimationContainer';
import debounced from '../functions/debounced.func';
import SSNavbar from '../components/SSNavbar';
import InlineSVG from 'react-inlinesvg';
import { navigate } from '@reach/router';

const debounceBuilder = debounced(200);

const ServiceView = (props) => {
  const { name } = queryString.parse(props.location.search);
  const [vpHeight, setVpHeight] = React.useState(window.outerHeight);

  const handleWindowResize = React.useCallback((e = {}) => {
    const height = e.target.outerHeight;
    debounceBuilder(() => setVpHeight(height));
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () =>
      window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);

  const handleScreenRotation = React.useCallback(() => {
    const newHeight = window.outerHeight;
    window.setTimeout(() => {
      setVpHeight(newHeight);
    }, 200);
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      'orientationchange',
      handleScreenRotation,
    );
    return () => {
      window.removeEventListener(
        'orientationchange',
        handleScreenRotation,
      );
    };
  }, [handleScreenRotation]);

  const getIframe = () => {
    switch (true) {
      case name === serviceConstants.YENZA_SERVICE:
        return (
          <iframe
            height="100%"
            width="100%"
            src="https://app.yenza.me/"
            allowFullScreen={true}
          />
        );
      case name === serviceConstants.RL_SERVICE:
        return (
          <iframe
            height="100%"
            width="100%"
            src="https://reflectivelearning.co.za/"
            allowFullScreen={true}
          />
        );
      case name === serviceConstants.SNAPPLIFY_SERVICE:
        return (
          <iframe
            height="100%"
            width="100%"
            src="https://www.snapplify.com/za/freeaccess"
            allowFullScreen={true}
          />
        );
      default:
        return 'no service chosen';
    }
  };
  return (
    <React.Fragment>
      <SSNavbar />
      <S.ServiceContainer>
        <S.IframeContainer vpHeight={vpHeight - 50}>
          {getIframe()}
        </S.IframeContainer>
        <AnimationContainer animatedClassName="animate__fadeInUp">
          <S.ExitButton onClick={() => navigate('/')}>
            <span>Exit</span>
            <InlineSVG src={LogoSrc} />
          </S.ExitButton>
        </AnimationContainer>
      </S.ServiceContainer>
    </React.Fragment>
  );
};

export default themed(ServiceView);

const S = {};

S.ServiceContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 999;
  background-color: ${(props) => props.theme.colors.white};

  .exit-button {
    position: absolute;
    bottom: 20px;
    left: 0px;
  }
`;

S.IframeContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => `${props.vpHeight}px`};
  overflow: hidden;
  //padding-top: 100%; /* 1:1 Aspect Ratio */

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;
S.IframeContainer.defaultProps = {
  vpHeight: window.innerHeight,
};

S.ExitButton = styled.button`
  background-color: ${(props) => props.theme.colors.tertiary};
  border: none;
  color: white;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 25px;
    height: auto;
    margin-left: 10px;
  }
`;
