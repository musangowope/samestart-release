import React from 'react';
import styled from 'styled-components';
import TopShapeSrc from 'svgs/top_shape.svg';
import BottomShapeSrc from 'svgs/bottom_shape.svg';
import InlineSVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import themed from '../functions/themed';

const TopShapeIcon = () => (
  <InlineSVG className="top-shape-icon" src={TopShapeSrc} />
);
const BottomShapeIcon = () => (
  <InlineSVG className="bottom-shape-icon" src={BottomShapeSrc} />
);

const BackgroundWrapper = styled.div`
  position: relative;
  height: 100%;

  .top-shape-icon {
    position: fixed;
    top: 0;
    left: 0;
  }

  .bottom-shape-icon {
    position: fixed;
    bottom: 0;
    right: 0;
  }
`;

const ShapedBackground = ({ children }) => {
  return (
    <BackgroundWrapper>
      <TopShapeIcon />
      <BottomShapeIcon />
      {children}
    </BackgroundWrapper>
  );
};

ShapedBackground.propTypes = {
  children: PropTypes.any,
};
ShapedBackground.defaultProps = {
  children: null,
};

export default themed(ShapedBackground);
