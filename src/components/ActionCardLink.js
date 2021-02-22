import React from 'react';
import themed from '../functions/themed';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';
import { Link } from '@reach/router';
import SimpleModal from './SimpleModal';
import CloseSrc from '../svgs/close.svg';
import CircleButton from './CircleButton';

const StyledLink = styled(Link)`
  border: 3px solid ${(props) => props.theme.colors.tertiary};
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-flow: row nowrap;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.tertiary};
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    flex-direction: row-reverse;
    padding: 10px;
    //justify-content: flex-start;
  }
`;

const StyledBody = styled.span`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledCardTitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes[4]};
  display: flex;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.tertiary};
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSizes[4]};
    text-align: left;
    align-self: center;
    margin-bottom: 0;
  }
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.xs}) {
    font-size: ${(props) => props.theme.fontSizes[3]};
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const StyledBodyText = styled.span`
  font-size: ${(props) => props.theme.fontSizes[2]};
  margin-bottom: 10px;
  display: block;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    text-align: center;
    display: none;
  }
`;

const StyledSvgWrapper = styled.span`
  border-radius: 50%;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    border: 3px solid ${(props) => props.theme.colors.tertiary};
    overflow: hidden;
    min-width: 100px;
    min-height: 100px;
    width: 100px;
    height: 100px;

    background-color: ${(props) => props.theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 200px;
    height: auto;
    @media screen and (max-width: ${(props) =>
        props.theme.breakpoints.sm}) {
      min-width: 100px;
      margin: auto;
    }
  }
`;

const StyledLinkContainer = styled.div`
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  .action-link-container__button {
    display: none;
    @media screen and (max-width: ${(props) =>
        props.theme.breakpoints.sm}) {
      display: block;
    }
  }
`;

StyledLinkContainer.defaultProps = {
  disabled: false,
};

const CloseWrapper = styled.div`
  margin-bottom: 20px;
  text-align: right;
  .ss-circle-button {
    border-color: ${(props) => props.theme.colors.tertiary};
    height: 35px;
    width: 35px;
    margin-left: auto;
    svg {
      width: 15px;
      height: auto;
      path {
        fill: ${(props) => props.theme.colors.tertiary};
      }
    }
  }
`;

const ModalWrapper = styled.div`
  .simple-modal__content {
    height: auto;
    font-size: ${(props) => props.theme.fontSizes[3]};
  }
  .simple-modal__content {
    padding: 20px;
  }
`;

const StyledDisableCover = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

StyledDisableCover.defaultProps = {
  show: 'false',
};

const ActionCardLink = ({
  svgSrc,
  cardTitle,
  cardBody,
  to,
  disabled,
}) => {
  const [isDescModalOpen, setIsDescOpenState] = React.useState(false);
  return (
    <React.Fragment>
      <StyledLinkContainer
        className="action-link-container"
        disabled={disabled}
      >
        <StyledLink to={to} className="action-link">
          <StyledBody className="action-link__body">
            <StyledCardTitle className="action-link__body__title">
              {cardTitle}
            </StyledCardTitle>
            <StyledBodyText className="action-link__body__text">
              {cardBody}
            </StyledBodyText>
          </StyledBody>

          <StyledSvgWrapper className="action-link__svg-wrapper">
            <InlineSVG src={svgSrc} />
          </StyledSvgWrapper>
        </StyledLink>
        <StyledDisableCover show={disabled} />
      </StyledLinkContainer>
      <ModalWrapper>
        <SimpleModal
          isOpen={isDescModalOpen}
          closeAction={() => setIsDescOpenState(false)}
        >
          <CloseWrapper>
            <CircleButton
              buttonText={<InlineSVG src={CloseSrc} />}
              actionCallback={() => setIsDescOpenState(false)}
            />
          </CloseWrapper>
          <div>{cardBody}</div>
        </SimpleModal>
      </ModalWrapper>
    </React.Fragment>
  );
};

ActionCardLink.propTypes = {
  cardTitle: PropTypes.string,
  cardBody: PropTypes.string,
  to: PropTypes.string,
  svgSrc: PropTypes.string,
  disabled: PropTypes.bool,
};

ActionCardLink.defaultProps = {
  cardTitle: PropTypes,
  cardBody: '',
  svgSrc: '',
  disabled: false,
};

export default themed(ActionCardLink);
