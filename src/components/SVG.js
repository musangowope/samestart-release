import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';

const SVG = ({ src }) => {
  return <InlineSVG src={src} />;
};

SVG.propTypes = {
  src: PropTypes.string,
};
SVG.defaultProps = {
  src: '',
};

export default SVG;
