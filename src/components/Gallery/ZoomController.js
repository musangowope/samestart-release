import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlusIconSrc from '../../svgs/plus.svg';
import MinusIconSrc from '../../svgs/minus.svg';
import CloseIconSrc from '../../svgs/close.svg';
import {
  StyledControllerWrapper,
  StyledOutlineButton,
  StyledRedActionButton,
} from './common-controller-styles';
import InlineSVG from 'react-inlinesvg';

const ZoomController = ({
  zoomInFn,
  zoomOutFn,
  closeFn,
  currentZoomPercentage,
}) => {
  return (
    <StyledZoomControllerWrapper>
      <StyledZoomButtonContainer>
        <StyledOutlineButton onClick={zoomInFn}>
          <InlineSVG src={PlusIconSrc} />
        </StyledOutlineButton>
        <StyledCurrentZoom>{currentZoomPercentage}</StyledCurrentZoom>
        <StyledOutlineButton onClick={zoomOutFn}>
          <InlineSVG src={MinusIconSrc} />
        </StyledOutlineButton>
      </StyledZoomButtonContainer>

      <StyledCloseWrapper>
        <StyledRedActionButton onClick={closeFn}>
          <InlineSVG src={CloseIconSrc} />
        </StyledRedActionButton>
      </StyledCloseWrapper>
    </StyledZoomControllerWrapper>
  );
};

ZoomController.propTypes = {
  zoomInFn: PropTypes.func,
  zoomOutFn: PropTypes.func,
  closeFn: PropTypes.func,
  currentZoomPercentage: PropTypes.string,
};
ZoomController.defaultProps = {
  zoomInFn: () => false,
  zoomOutFn: () => false,
  closeFn: () => false,
  currentZoomPercentage: '100%',
};

const StyledZoomControllerWrapper = styled(StyledControllerWrapper)`
  width: 220px;
`;

const StyledZoomButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCurrentZoom = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
`;

const StyledCloseWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default ZoomController;
