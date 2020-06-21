import React from 'react';
import styled from 'styled-components';
import themed from '../../functions/themed';
import { NavHeight } from './index';
import SVG from '../SVG';
import LogoSrc from 'svgs/logo.svg';
import TutSrc from 'svgs/online-tutorials.svg';
import YenzaSrc from 'svgs/yenza-logo.svg';
import { navigate, Location } from '@reach/router';
import { darken } from 'polished';

const MobileNavContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  height: ${NavHeight}px;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const MobileNavButton = styled.button`
  background-color: ${(props) => props.theme.colors.tertiary};
  height: 50px;
  width: 50px;
  transition: border-color 500ms;
  border-radius: 50%;
  border: 2px solid
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

MobileNavButton.defaultProps = {
  isSelected: false,
  disabled: false,
};

const MobileNavbar = (props) => {
  return (
    <Location>
      {({ location: { pathname } }) => {
        return (
          <MobileNavContainer>
            <MobileNavItem>
              <MobileNavButton
                isSelected={pathname === '/subjects'}
                onClick={() => navigate('/subjects')}
              >
                <SVG src={LogoSrc} />
              </MobileNavButton>
            </MobileNavItem>

            <MobileNavItem>
              <MobileNavButton
                isSelected={pathname === '/yenza'}
                onClick={() => navigate('/yenza')}
              >
                <SVG src={YenzaSrc} />
              </MobileNavButton>
            </MobileNavItem>
            <MobileNavItem>
              <MobileNavButton disabled>
                <SVG src={TutSrc} />
              </MobileNavButton>
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
