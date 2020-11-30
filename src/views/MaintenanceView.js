import React from 'react';
import ThembiSrc from 'images/thembi-cell.png';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themed from '../functions/themed';
import InstagramSrc from 'svgs/instagram.svg';
import LinkedInSrc from 'svgs/linkedin.svg';
import MailSrc from 'svgs/mail.svg';
import InlineSVG from 'react-inlinesvg';
import getUrlParams from '../functions/getUrlParams.func';

const StyledMaintenanceContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackgroundCircle = styled.div`
  height: 600px;
  width: 600px;
  background-color: ${(props) => props.theme.colors.primary};
  position: absolute;
  left: -150px;
  top: -150px;
  border-radius: 50%;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    display: none;
  }
`;
const StyledTrapezium = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 600px;
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 41% 100%);
  background-color: ${(props) => props.theme.colors.tertiary};
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledMaintenceContent = styled.div`
  position: relative;
  z-index: 9;
  background-color: ${(props) => props.theme.colors.white};
  width: 80%;
  height: 90%;
  margin: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  padding: 40px;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    display: block;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

const StyledMaintenanceTextContainer = styled.div`
  align-self: center;
  margin-right: 5rem;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.colors.white};
    margin: auto;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
`;

const StyledMaintenancePrimaryHeading = styled.div`
  font-size: ${(props) => props.theme.fontSizes[7]};
  //text-transform: uppercase;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const StyledMaintenanceSecondaryHeading = styled.div`
  font-size: ${(props) => props.theme.fontSizes[5]};
  color: ${(props) => props.theme.colors.secondary};
  //text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledMaintenanceImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  img {
    max-width: 300px;
    width: 100%;
    height: auto;
    margin: auto;

    @media screen and (max-width: ${(props) =>
        props.theme.breakpoints.md}) {
      max-width: 270px;
      width: 100%;
    }
  }
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const StyledSocialIconsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StyledSocialIconItemLink = styled.a`
  display: block;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

const MaintenanceView = () => {
  return (
    <StyledMaintenanceContainer>
      <StyledBackgroundCircle />
      <StyledTrapezium />
      <StyledMaintenceContent>
        <StyledMaintenanceTextContainer>
          <StyledMaintenancePrimaryHeading>
            Same Start
          </StyledMaintenancePrimaryHeading>
          <StyledMaintenanceSecondaryHeading>
            Coming Soon..
          </StyledMaintenanceSecondaryHeading>
          <StyledSocialIconsContainer>
            <StyledSocialIconItemLink
              href="https://www.instagram.com/same_start/"
              target="_blank"
              rel="noreferrer"
            >
              <InlineSVG src={InstagramSrc} />
            </StyledSocialIconItemLink>
            <StyledSocialIconItemLink
              href="https://www.linkedin.com/company/same-start/?viewAsMember=true"
              target="_blank"
              rel="noreferrer"
            >
              <InlineSVG src={LinkedInSrc} />
            </StyledSocialIconItemLink>
            <StyledSocialIconItemLink href="mailto:admin@samestart.com">
              <InlineSVG src={MailSrc} />
            </StyledSocialIconItemLink>
          </StyledSocialIconsContainer>
        </StyledMaintenanceTextContainer>
        <StyledMaintenanceImgWrapper>
          <img src={ThembiSrc} alt="coming-soon" />
        </StyledMaintenanceImgWrapper>
      </StyledMaintenceContent>
    </StyledMaintenanceContainer>
  );
};

MaintenanceView.propTypes = {};
MaintenanceView.defaultProps = {};

export default themed(MaintenanceView);
