import React from 'react';
import PropTypes from 'prop-types';
import { baseRequestState } from '../constants/baseRequest';

const AxiosRequester = ({
  axiosPromise,
  onLoadRender: LoaderComponent,
  onSuccessRender: SuccessComponent,
  onFailureRender: FailureComponent,
}) => {
  const [requestState, setRequestState] = React.useState(
    baseRequestState,
  );
  const [successData, setSuccessData] = React.useState(null);

  const updateRequest = (obj = {}) =>
    setRequestState({
      ...baseRequestState,
      ...obj,
    });

  React.useEffect(() => {
    updateRequest({ loading: true });
    axiosPromise()
      .then((res) => {
        updateRequest({ success: true });
        setSuccessData(res.data);
      })
      .catch((e) => {
        updateRequest({ failed: true, errorData: e });
        setSuccessData(e);
      });
  }, [axiosPromise]);

  const { loading, success, failed, errorData } = requestState;

  return (
    <React.Fragment>
      {loading && <LoaderComponent />}
      {success && successData && (
        <SuccessComponent successData={successData} />
      )}
      {failed && errorData && (
        <FailureComponent errorData={errorData} />
      )}
    </React.Fragment>
  );
};

AxiosRequester.propTypes = {
  axiosPromise: PropTypes.func.isRequired,
  onLoadRender: PropTypes.func,
  onSuccessRender: PropTypes.func,
  onFailureRender: PropTypes.func,
};
AxiosRequester.defaultProps = {
  onLoadRender: () => 'LOADING',
  onSuccessRender: () => null,
  onFailureRender: () => 'Something went wrong',
};

const MemoizedAxiosRequester = React.memo(AxiosRequester);

export default MemoizedAxiosRequester;
