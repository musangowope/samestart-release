import React from 'react';
import styled from 'styled-components';
import themed from '../../functions/themed';
const SSNavbar = () => {
  return (
    <StyledMobileNavContainer className="nav-container">
      <div>Same Start Demo (Development discontinued)</div>
    </StyledMobileNavContainer>
  );
};

export default themed(SSNavbar);

export const NavMenuHeight = 74;

const StyledMobileNavContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  position: fixed;
  z-index: 9;
  width: 100%;
  bottom: 0;
  height: ${() => `${NavMenuHeight}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  //text-transform: uppercase;
  color: white;
`;
