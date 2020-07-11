import React, { useEffect } from 'react';
import themed from '../functions/themed';
import queryString from 'query-string';
import serviceConstants from '../constants/serviceConstants';
import IFrameComponent from '../components/IFrameComponent';
import styled from 'styled-components';
import LogoSrc from '../svgs/logo.svg';
import SVG from '../components/SVG';
import { MobileNavButton } from '../components/SSNavbar/MobileNavbar';
import { navigate } from '@reach/router';
import AnimationContainer from '../components/AnimationContainer';
// import { handleOutsideElementClick } from '../functions/handleOutsideElementClick.func';
import debounced from '../functions/debounced.func';

const debounceBuilder = debounced(200);

const ServiceContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 999;
  background-color: ${(props) => props.theme.colors.white};

  ${MobileNavButton} {
    position: absolute;
    bottom: 20px;
    left: 10px;
  }
`;

const IframeContainer = styled.div`
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

IframeContainer.defaultProps = {
  vpHeight: window.innerHeight,
};

const ServiceView = (props) => {
  const { name } = queryString.parse(props.location.search);
  const [vpHeight, setVpHeight] = React.useState(window.innerHeight);

  const handleWindowResize = (e = {}) => {
    const height = e.target.outerHeight;
    debounceBuilder(() => setVpHeight(height));
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () =>
      window.removeEventListener('resize', handleWindowResize);
  }, []);

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
            src="https://www.snapplify.com/"
            allowFullScreen={true}
          />
        );
      default:
        return 'no service chosen';
    }
  };
  return (
    <ServiceContainer>
      <IframeContainer vpHeight={vpHeight}>
        {getIframe()}
      </IframeContainer>
      <AnimationContainer animatedClassName="animate__fadeInLeft">
        <MobileNavButton onClick={() => navigate('/subjects')}>
          <SVG src={LogoSrc} />
        </MobileNavButton>
      </AnimationContainer>
    </ServiceContainer>
  );
};

export default themed(ServiceView);
