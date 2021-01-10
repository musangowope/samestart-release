import React from 'react';
import themed from '../functions/themed';
import queryString from 'query-string';
import serviceConstants from '../constants/serviceConstants';
import styled from 'styled-components';
import LogoSrc from '../svgs/logo.svg';
import debounced from '../functions/debounced.func';
import InlineSVG from 'react-inlinesvg';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';

const debounceBuilder = debounced(200);

const ServiceView = ({ location }) => {
  const { name } = queryString.parse(location.search);
  const [vpHeight, setVpHeight] = React.useState(
    window.screen.availHeight,
  );

  const handleWindowResize = React.useCallback(() => {
    const height = window.screen.availHeight;
    debounceBuilder(() => setVpHeight(height));
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () =>
      window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);

  const getIframe = () => {
    switch (true) {
      case name === serviceConstants.YENZA_SERVICE:
        return (
          <iframe
            height="100%"
            width="100%"
            src="https://app.yenza.me/"
            title="Yenza"
            allowFullScreen={true}
          />
        );
      case name === serviceConstants.RL_SERVICE:
        return (
          <iframe
            height="100%"
            width="100%"
            title="Reflective Learning"
            src="https://reflectivelearning.co.za/"
            allowFullScreen={true}
          />
        );
      case name === serviceConstants.SNAPPLIFY_SERVICE:
        return (
          <iframe
            height="100%"
            width="100%"
            title="Snapplify"
            src="https://www.snapplify.com/za/freeaccess"
            allowFullScreen={true}
          />
        );
      default:
        return 'no service chosen';
    }
  };
  return (
    <S.ServiceContainer>
      <S.IframeContainer vpHeight={vpHeight - 50}>
        {getIframe()}
      </S.IframeContainer>
      <S.ExitButton onClick={() => navigate('/')}>
        <span>Exit</span>
        <InlineSVG src={LogoSrc} />
      </S.ExitButton>
    </S.ServiceContainer>
  );
};

ServiceView.propTypes = {
  location: PropTypes.object,
};

ServiceView.defaultProps = {
  location: {},
};

export default themed(ServiceView);

const S = {};

S.ServiceContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 999;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
`;

S.IframeContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: scroll;

  iframe {
    width: 100%;
    height: 100%;
  }
`;

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
