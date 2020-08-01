import React from 'react';
import styled from 'styled-components';
import themed from '../functions/themed';
import { transparentize } from 'polished';
import LandingIcon from '../svgs/landing-icon.svg';
import SVG from '../components/SVG';
import PrimaryButtonLink from '../components/elements/buttons/PrimaryButtonLink';
import BlockLoader from '../components/BlockLoader';
import theme from '../constants/theme';

const FlexContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    align-items: center;
  }
`;

const LandingIconContainer = styled.div`
  flex-basis: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 435px;
  }
`;

const HomeLayout = styled.div`
  display: flex;
  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.lg};
  margin-left: auto;
  margin-right: auto;
  position: relative;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    display: block;
  }
`;
const LeftSide = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 50%;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    background-color: ${(props) =>
      transparentize(0.1, props.theme.colors.white)};
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
  }
`;

const LeftSideContent = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const MainTitle = styled.div`
  color: ${(props) => props.theme.colors.tertiary};
  font-size: ${(props) => props.theme.fontSizes[6]};
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const SecondaryTitle = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes[5]};
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const StyledStartLearningLink = styled(PrimaryButtonLink)`
  display: inline-block;
`;

const LandingIconLoader = () => (
  <BlockLoader
    primaryLoadingClr={transparentize(0.8, theme.colors.baseColor)}
    secondaryLoadingClr={transparentize(0.8, theme.colors.grey)}
    height="300px"
  />
);

const HomeView = (props) => {
  return (
    <React.Fragment>
      <FlexContainer>
        <HomeLayout>
          <LeftSide>
            <LeftSideContent>
              <MainTitle>Same Start</MainTitle>
              <SecondaryTitle>Leveling Education</SecondaryTitle>
              <div>
                <StyledStartLearningLink to="/subjects">
                  Start Learning
                </StyledStartLearningLink>
              </div>
            </LeftSideContent>
          </LeftSide>
          <LandingIconContainer>
            <SVG
              src={LandingIcon}
              loaderComponent={LandingIconLoader}
            />
          </LandingIconContainer>
        </HomeLayout>
      </FlexContainer>
    </React.Fragment>
  );
};

export default themed(HomeView);
