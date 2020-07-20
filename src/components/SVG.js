import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';
import { baseRequestState } from '../constants/baseRequest';

const baseState = {
  loading: true,
  failed: false,
  success: true,
};

const postLoadingBaseState = baseRequestState;

const SVG = ({
  src,
  loaderComponent: LoaderComponent,
  onLoaded,
  onError,
}) => {
  const [svgState, setSvgState] = React.useState(baseState);

  const updateRequest = (obj = {}) =>
    setSvgState({
      ...postLoadingBaseState,
      ...obj,
    });

  const { loading, failed } = svgState;
  return (
    <React.Fragment>
      {loading && <LoaderComponent />}
      {failed && <div>Could not load SVG</div>}
      <InlineSVG
        onLoad={(e) => {
          onLoaded(e);
          updateRequest({ success: true });
        }}
        src={src}
        onError={(e) => {
          onError(e);
          updateRequest({ failed: true });
        }}
      />
    </React.Fragment>
  );
};

SVG.propTypes = {
  src: PropTypes.string,
  onLoaded: PropTypes.func,
  onError: PropTypes.func,
  loaderComponent: PropTypes.func,
};
SVG.defaultProps = {
  src: '',
  onLoaded: () => false,
  onError: () => false,
  loaderComponent: () => 'LOADING',
};

export default SVG;
