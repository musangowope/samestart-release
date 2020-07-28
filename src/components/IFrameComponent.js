import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { baseRequestState } from '../constants/baseRequest';

const IFrameContainer = styled.div`
  height: 100%;
`;

const HidingIFrameWhenLoading = styled.iframe`
  display: ${({ loading, failed }) =>
    failed || loading ? 'none' : 'block'};
`;

HidingIFrameWhenLoading.defaultProps = {
  loading: false,
  failed: false,
};

const IFrameComponent = ({ url = '' }) => {
  const [request, setRequest] = React.useState({
    success: false,
    loading: true,
    failed: false,
    errorData: null,
  });
  const updateRequest = (obj = {}) =>
    setRequest({
      ...baseRequestState,
      ...obj,
    });

  const { failed, loading } = request;

  return (
    <IFrameContainer>
      {loading && 'Loading'}
      {failed && 'Could not load iframe'}
      <HidingIFrameWhenLoading
        // error={failed}
        // loading={loading}
        src={url}
        height="100%"
        width="100%"
        onLoad={() => updateRequest({ success: true })}
      />
    </IFrameContainer>
  );
};

IFrameComponent.propTypes = {
  url: PropTypes.string,
};
IFrameComponent.defaultProps = {
  url: '',
};

export default IFrameComponent;
