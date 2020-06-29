import React from 'react';
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

const ServiceView = (props) => {
  const { name } = queryString.parse(props.location.search);

  const getIframe = () => {
    switch (true) {
      case name === serviceConstants.YENZA_SERVICE:
        return (
          <iframe
            height="100%"
            width="100%"
            src="http://yenza.me/"
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
      {getIframe()}
      <AnimationContainer animatedClassName="animate__fadeInLeft">
        <MobileNavButton onClick={() => navigate('/subjects')}>
          <SVG src={LogoSrc} />
        </MobileNavButton>
      </AnimationContainer>
    </ServiceContainer>
  );
};

export default themed(ServiceView);
