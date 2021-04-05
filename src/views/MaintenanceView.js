import React from 'react';
import ThembiSrc from 'images/thembi-cell.png';
import styled from 'styled-components';
import themed from '../functions/themed';
import InstagramSrc from 'svgs/instagram.svg';
import LinkedInSrc from 'svgs/linkedin.svg';
import MailSrc from 'svgs/mail.svg';
import InlineSVG from 'react-inlinesvg';

const MaintenanceView = () => {
  return (
    <StyledMaintenanceContainer>
      <StyledBackgroundCircle />
      <StyledTrapezium />
      <StyledMaintenceContent>
        <StyledMaintenanceTextContainer>
          <StyledMaintenancePrimaryHeading>
            Same<span className="alt-color">Start</span>
          </StyledMaintenancePrimaryHeading>
          <StyledMaintenanceSecondaryHeading>
            Click{' '}
            <a
              href="https://play.google.com/store/apps/details?id=com.ayoba.ayoba&hl=en_ZA&gl=US"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{' '}
            to download Ayoba and access SameStart. Also feel free to
            connect with us on Instagram and LinkedIn or contact us
            directly via email
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

export default themed(MaintenanceView);

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
    padding: 20px;
    width: 100%;
    height: 100%;
  }
`;

const StyledMaintenanceTextContainer = styled.div`
  flex-basis: 40%;
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
    padding: ${(props) => props.theme.marginPaddings[2]};
  }
`;

const StyledMaintenancePrimaryHeading = styled.div`
  font-size: ${(props) => props.theme.fontSizes[7]};
  font-weight: 400;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
  text-transform: uppercase;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSizes[6]};
  }

  .alt-color {
    color: ${(props) => props.theme.colors.tertiary};
  }
`;

const StyledMaintenanceSecondaryHeading = styled.div`
  font-size: ${(props) => props.theme.fontSizes[4]};
  color: ${(props) => props.theme.colors.secondary};
  //font-weight: bold;
  margin-bottom: 25px;
  //max-width: 60%;

  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSizes[3]};
  }

  a {
    color: ${(props) => props.theme.colors.primary};
  }
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
  display: flex;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  height: 65px;
  width: 65px;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  svg {
    width: 40px;
  }

  &:last-child {
    margin-right: 0;
  }
`;
