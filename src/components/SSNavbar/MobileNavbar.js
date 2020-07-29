import React from 'react';
import styled from 'styled-components';
import themed from '../../functions/themed';
import SVG from '../SVG';
import LogoSrc from 'svgs/logo.svg';
import Tm2Src from 'svgs/tm2.svg';
import YenzaSrc from 'svgs/yenza-logo.svg';
import RLSrc from 'svgs/rl.svg';
import SnapplifySrc from 'images/snapplify.png';
import { navigate, Location } from '@reach/router';
import { darken } from 'polished';
import serviceConstants from '../../constants/serviceConstants';
import { GlobalContext } from '../../App';
import BlockLoader from '../BlockLoader';

const isSameNavButtonActive = (pathname = '') => {
  switch (true) {
    case pathname.includes('/subjects'):
    case pathname.includes('/syllabus'):
    case pathname.includes('/lesson'):
      return true;
    default:
      return false;
  }
};

const MobileNavbar = (props) => {
  const {
    contextState: { mobileNavbarActive },
  } = React.useContext(GlobalContext);
  return (
    <Location>
      {({ location: { pathname, search } }) => {
        return (
          <StyledMobileNavContainer
            className="mobile-nav-container"
            mobileNavbarActive={mobileNavbarActive}
          >
            <div className="columns is-mobile">
              <div className="column is-one-quarter">
                <MobileNavItem>
                  <StyledMobileNavButton
                    isSelected={isSameNavButtonActive(pathname)}
                    onClick={() => navigate('/subjects')}
                  >
                    <SVG
                      loaderComponent={BlockLoader}
                      src={LogoSrc}
                    />
                  </StyledMobileNavButton>
                </MobileNavItem>
              </div>
              <div className="column is-one-quarter">
                <MobileNavItem>
                  <StyledYenzaNavButton
                    isSelected={
                      pathname.includes('/service') &&
                      search.includes(
                        `name=${serviceConstants.YENZA_SERVICE}`,
                      )
                    }
                    onClick={() =>
                      navigate(
                        `/service?name=${serviceConstants.YENZA_SERVICE}`,
                      )
                    }
                  >
                    <SVG
                      loaderComponent={BlockLoader}
                      src={YenzaSrc}
                    />
                  </StyledYenzaNavButton>
                </MobileNavItem>
              </div>
              <div className="column is-one-quarter">
                <MobileNavItem>
                  <StyledSnapplifyNavButton
                    isSelected={
                      pathname.includes('/service') &&
                      search.includes(
                        `name=${serviceConstants.SNAPPLIFY_SERVICE}`,
                      )
                    }
                    onClick={() =>
                      navigate(
                        `/service?name=${serviceConstants.SNAPPLIFY_SERVICE}`,
                      )
                    }
                  >
                    <img src={SnapplifySrc} alt="snapplify" />
                  </StyledSnapplifyNavButton>
                </MobileNavItem>
              </div>
              <div className="column is-one-quarter">
                <MobileNavItem>
                  <StyledRLNavButton
                    onClick={() =>
                      navigate(
                        `/service?name=${serviceConstants.RL_SERVICE}`,
                      )
                    }
                    isSelected={
                      pathname.includes('/service') &&
                      search.includes(
                        `name=${serviceConstants.RL_SERVICE}`,
                      )
                    }
                  >
                    <SVG loaderComponent={BlockLoader} src={RLSrc} />
                  </StyledRLNavButton>
                </MobileNavItem>
              </div>
            </div>
          </StyledMobileNavContainer>
        );
      }}
    </Location>
  );
};

export default themed(MobileNavbar);

const StyledMobileNavContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  position: fixed;
  z-index: 9;
  width: 100%;
  bottom: 0;
  padding: 10px;
  display: ${(props) =>
    props.mobileNavbarActive ? 'block' : 'none'};
  @media screen and (min-width: ${(props) =>
      props.theme.breakpoints.md}) {
    display: none;
  }
`;

StyledMobileNavContainer.defaultProps = {
  mobileNavbarActive: true,
};

const MobileNavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .block-loader {
    border-radius: 50%;
  }
`;

export const StyledMobileNavButton = styled.button`
  background-color: ${(props) => props.theme.colors.tertiary};
  height: 50px;
  width: 50px;
  transition: border-color 500ms;
  border-radius: 50%;
  border: 3px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.primary
        : darken(0.08, props.theme.colors.secondary)};
  box-shadow: none;
  padding: 0;

  svg {
    width: 30px;
    height: 30px;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledYenzaNavButton = styled(StyledMobileNavButton)`
  svg {
    width: 45px;
    height: 45px;
  }
`;

const StyledSnapplifyNavButton = styled(StyledMobileNavButton)`
  img {
    width: 30px;
  }
`;

const StyledRLNavButton = styled(StyledMobileNavButton)`
  background: ${(props) => props.theme.colors.white};
`;

StyledMobileNavButton.defaultProps = {
  isSelected: false,
  disabled: false,
};

// const StyledSvgLoaderWrapper =
