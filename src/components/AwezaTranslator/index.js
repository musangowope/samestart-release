import React from 'react';
import axios from 'axios';
import api from 'constants/api';
import themed from 'functions/themed';
import PropTypes from 'prop-types';
import AwezaContent from './AwezaContent';
import { baseRequestState } from '../../constants/baseRequest';

const AwezaTranslator = ({ termId }) => {
  const awezaRequest = axios.create({
    method: 'get',
    baseURL: api.searchByAwezaTermById(termId),
    validateStatus: (status) => status >= 200 && status < 300,
    timeout: 20000,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AWEZA_TOKEN}`,
      'AWEZA-KEY': process.env.REACT_APP_AWEZA_KEY,
      'AWEZA-SECRET': process.env.REACT_APP_AWEZA_SECRET,
    },
  });

  const [awezaData, setAwezaData] = React.useState(null);
  const [requestState, setRequestState] = React.useState(
    baseRequestState,
  );

  const updateRequest = (obj = {}) =>
    setRequestState({
      ...baseRequestState,
      ...obj,
    });

  const getAwezaData = React.useCallback(() => {
    updateRequest({ loading: true });
    awezaRequest()
      .then(({ data }) => {
        updateRequest({ success: true });
        setAwezaData(data);
      })
      .catch((e) => {
        updateRequest({ failed: true });
      });
  }, []);

  React.useEffect(() => {
    if (termId) {
      getAwezaData();
    }
  }, [getAwezaData, termId]);

  const { success, loading, failed } = requestState;

  const renderAwezaContent = () => {
    if (awezaData) {
      const {
        language: { code, name: langLabel },
        text: termTitle = '',
        audio = null,
        tts: { text: tss = '' },
        description: termDescription = '',
        translations = [],
      } = awezaData;

      const langOpts = [
        { label: langLabel, value: code },
        ...translations.map(({ language: { name, code } }) => ({
          label: name,
          value: code,
        })),
      ];

      return (
        <AwezaContent
          termTitle={termTitle}
          langValue={code}
          langLabel={langLabel}
          langOpts={langOpts}
          audio={audio}
          tts={tss}
          translations={[awezaData, ...translations]}
          categories={[]}
          termDescription={termDescription}
        />
      );
    }

    return null;
  };

  return (
    <React.Fragment>
      {loading && <div>Loading</div>}
      {success && renderAwezaContent()}
      {failed && <div>something went wrong</div>}
    </React.Fragment>
  );
};

AwezaTranslator.propTypes = {
  termId: PropTypes.string,
};

AwezaTranslator.defaultProps = {
  termId: '',
};

export default themed(AwezaTranslator);
