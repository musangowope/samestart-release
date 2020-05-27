import React from 'react';
import styled, { css } from 'styled-components';
import themed from '../functions/themed';
import LogIcon from '../svgs/logo.svg';
import { Link } from '@reach/router';
import InlineSVG from 'react-inlinesvg';

export const NavHeight = 74;

const Navbar = styled.div`
  position: sticky;
  width: 100%;
  background-color: ${(props) => props.theme.colors.tertiary};
  top: 0;
  height: ${NavHeight}px;
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  z-index: 9999;
`;

const LogoLink = styled(Link)`
  svg {
    width: 55px;
    height: 55px;
  }
`;

const NavContents = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${(props) => props.theme.breakpoints.lg};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavItemStyle = css`
  color: ${(props) => props.theme.colors.grey};
  font-size: ${(props) => props.theme.fontSizes[4]};
  margin-right: 10px;
  margin-left: 10px;
  display: flex;
  transition: 200ms ease-in-out color;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
`;

const NavItemLink = styled(Link)`
  ${NavItemStyle};
`;

const NavItemButton = styled.button`
  ${NavItemStyle};
  background: none;
  border: none;
`;

const DeskMenuItemsWrapper = styled.div`
  display: flex;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    display: none;
  }
`;

const SSNavbar = () => {
  return (
    <Navbar>
      <NavContents>
        <LogoLink to="/">
          <InlineSVG src={LogIcon} />
        </LogoLink>
        <MenuItemWrapper>
          <DeskMenuItemsWrapper>
            <NavItemLink to="/about-us">About</NavItemLink>
            <NavItemLink to="/subjects">Subjects</NavItemLink>
          </DeskMenuItemsWrapper>
        </MenuItemWrapper>
      </NavContents>
    </Navbar>
  );
};

export default themed(SSNavbar);
