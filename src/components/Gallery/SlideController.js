import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themed from '../../functions/themed';
import ArrowLeftIcon from '../../svgs/arrow-left.svg';
import ArrowRightIcon from '../../svgs/arrow-right.svg';
import InlineSVG from 'react-inlinesvg';
import {
  StyledBlueActionButton,
  StyledControllerWrapper,
  StyledSlideNumberContainer,
} from './common-controller-styles';

const SlideController = ({
  currentSlideNumber,
  nextBtnFn,
  prevBtnFn,
  disableNextFn,
  disablePrevFn,
}) => {
  return (
    <StyledControllerWrapper>
      <StyledBlueActionButton
        disabled={disablePrevFn}
        type="button"
        onClick={prevBtnFn}
      >
        <InlineSVG src={ArrowLeftIcon} />
      </StyledBlueActionButton>
      <StyledSlideNumberContainer>
        <StyledSlideNumber>
          {currentSlideNumber + 1}
        </StyledSlideNumber>
      </StyledSlideNumberContainer>
      <StyledBlueActionButton
        disabled={disableNextFn}
        type="button"
        onClick={nextBtnFn}
      >
        <InlineSVG src={ArrowRightIcon} />
      </StyledBlueActionButton>
    </StyledControllerWrapper>
  );
};

SlideController.propTypes = {
  numberOfSlides: PropTypes.number,
  currentSlideNumber: PropTypes.number,
  nextBtnFn: PropTypes.func,
  prevBtnFn: PropTypes.func,
  disableNextFn: PropTypes.bool,
  disablePrevFn: PropTypes.bool,
};
SlideController.defaultProps = {
  numberOfSlides: 0,
  currentSlideNumber: 0,
  nextBtnFn: () => false,
  prevBtnFn: () => false,
  disableNextFn: false,
  disablePrevFn: false,
};

export default themed(SlideController);

const StyledSlideNumber = styled.span`
  margin-top: 2px;
`;
