import React from 'react';
import styled from 'styled-components';
import themed from '../../functions/themed';
import { NavHeight } from './index';
import SVG from '../SVG';
import LogoSrc from 'svgs/logo.svg';
import Tm2Src from 'svgs/tm2.svg';
import YenzaSrc from 'svgs/yenza-logo.svg';
import RLSrc from 'svgs/rl.svg';
import SnapplifySrc from 'images/snapplify.png';
import { navigate, Location } from '@reach/router';
import { darken } from 'polished';
import serviceConstants from '../../constants/serviceConstants';

const MobileNavContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  height: ${NavHeight}px;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media screen and (min-width: ${(props) =>
      props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MobileNavButton = styled.button`
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

const YenzaNavButton = styled(MobileNavButton)`
  svg {
    width: 45px;
    height: 45px;
  }
`;

const SnapplifyNavButton = styled(MobileNavButton)`
  img {
    width: 30px;
  }
`;

const RLNavButton = styled(MobileNavButton)`
  background: ${(props) => props.theme.colors.white};
`;

MobileNavButton.defaultProps = {
  isSelected: false,
  disabled: false,
};

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
  return (
    <Location>
      {({ location: { pathname, search } }) => {
        return (
          <MobileNavContainer>
            <MobileNavItem>
              <MobileNavButton
                isSelected={isSameNavButtonActive(pathname)}
                onClick={() => navigate('/subjects')}
              >
                <SVG src={LogoSrc} />
              </MobileNavButton>
            </MobileNavItem>

            <MobileNavItem>
              <YenzaNavButton
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
                <SVG src={YenzaSrc} />
              </YenzaNavButton>
            </MobileNavItem>
            <MobileNavItem>
              <SnapplifyNavButton
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
              </SnapplifyNavButton>
            </MobileNavItem>
            <MobileNavItem>
              <RLNavButton
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
                <SVG src={RLSrc} />
              </RLNavButton>
            </MobileNavItem>
          </MobileNavContainer>
        );
      }}
    </Location>
  );
};

MobileNavbar.propTypes = {};
MobileNavbar.defaultProps = {};

export default themed(MobileNavbar);
