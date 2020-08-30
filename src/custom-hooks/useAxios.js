import React from 'react';
import axios from 'axios';
import { hasValue } from '../functions/hasValue.func';

const baseRequestState = {
  loading: false,
  failed: false,
  success: false,
  response: {},
  errorData: null,
};

export default function useFetch(
  url = '',
  method = 'get',
  config = null,
) {
  const [request, setRequestState] = React.useState(baseRequestState);
  const updateRequest = (obj = {}) =>
    setRequestState({
      ...baseRequestState,
      ...obj,
    });

  React.useEffect(() => {
    if (hasValue(url)) {
      const fetchData = async () => {
        updateRequest({
          loading: true,
        });
        try {
          axios[method](url, config).then((res) => {
            console.log(res.data);
            updateRequest({
              success: true,
              response: res.data,
            });
          });
        } catch (err) {
          updateRequest({
            failed: true,
            errorData: err,
          });
        }
      };

      fetchData();
    }
  }, [config, method, url]);

  return request;
}
