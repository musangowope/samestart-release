import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';
import styled from 'styled-components';
import { baseRequestState } from '../constants/baseRequest';

const baseState = {
  loading: true,
  failed: false,
  success: false,
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

  const { loading, failed, success } = svgState;
  return (
    <React.Fragment>
      {loading && <LoaderComponent />}
      {failed && <div>Could not load SVG</div>}

      <StyledSvgWrapper ready={success}>
        <InlineSVG
          onLoad={(e) => {
            onLoaded(e);
            if (LoaderComponent) {
              return setTimeout(
                () => updateRequest({ success: true }),
                500,
              );
            }

            return updateRequest({ success: true });
          }}
          src={src}
          onError={(e) => {
            onError(e);
            updateRequest({ failed: true });
          }}
        />
      </StyledSvgWrapper>
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
  loaderComponent: () => null,
};

export default SVG;

const StyledSvgWrapper = styled.div`
  display: ${(props) => (props.ready ? 'block' : 'none')};
`;

StyledSvgWrapper.defaultProps = {
  ready: false,
};
