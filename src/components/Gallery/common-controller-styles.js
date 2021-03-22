import styled, { css } from 'styled-components';
import themed from '../../functions/themed';

const CommonActionButtonStyles = css`
  padding: 0;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 10px;
    height: auto;
  }
`;

export const StyledControllerWrapper = themed(styled.div`
  background-color: ${(props) => props.theme.colors.tertiary};
  min-width: 200px;
  padding: 15px;
  border-radius: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  color: white;
`);

export const StyledBlueActionButton = themed(styled.button`
  ${CommonActionButtonStyles};
  background-color: ${(props) => props.theme.colors.secondary};
`);

export const StyledRedActionButton = themed(styled.button`
  ${CommonActionButtonStyles};
  background-color: ${(props) => props.theme.colors.error};
`);

export const StyledOutlineButton = themed(styled.button`
  ${CommonActionButtonStyles};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.white};
`);

export const StyledSlideNumberContainer = themed(styled.div`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`);
