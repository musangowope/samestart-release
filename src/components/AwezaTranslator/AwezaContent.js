import React from 'react';
import SSDropSelect from '../SSDropSelect';
import { createMarkup } from '../../functions/createMarkup.func';
import PropTypes from 'prop-types';

const AwezaContent = ({
  termTitle,
  audio,
  langValue,
  langLabel,
  termDescription,
  langOpts,
  tts,
  categories,
  translations,
}) => {
  const [termTitleState, setTermTitle] = React.useState(termTitle);
  const [langValueState, setLangValue] = React.useState(langValue);
  const [audioState, setAudio] = React.useState(audio);
  const [termDescriptionState, setTermDescription] = React.useState(
    termDescription,
  );
  const [ttsState, setTts] = React.useState(tts);
  const [categoriesState, setCategories] = React.useState(categories);

  React.useEffect(() => {
    const translateTermData = translations.filter(
      ({ language: { code } }) => code === langValueState,
    )[0];
    if (translateTermData) {
      setTermTitle(translateTermData.text);
      setTermDescription(translateTermData.description);
      setAudio(translateTermData.audio);
      setTts(translateTermData.tts);
    }
  }, [langValueState, translations]);

  return (
    <React.Fragment>
      <div>{termTitleState}</div>
      <SSDropSelect
        options={langOpts}
        title="Current Language"
        onChange={({ value }) => setLangValue(value)}
        defaultValue={{
          label: langLabel,
          value: langValue,
        }}
      />
      <br />
      <div>Definition:</div>
      <div
        dangerouslySetInnerHTML={createMarkup(termDescriptionState)}
      />
    </React.Fragment>
  );
};

AwezaContent.propTypes = {
  termTitle: PropTypes.string,
  audio: PropTypes.string,
  langValue: PropTypes.any,
  langLabel: PropTypes.string,
  termDescription: PropTypes.string,
  langOpts: PropTypes.array,
  tts: PropTypes.object,
  categories: PropTypes.array,
  translations: PropTypes.array,
};
AwezaContent.defaultProps = {
  termTitle: '',
  audio: '',
  langValue: null,
  langLabel: '',
  termDescription: '',
  langOpts: [],
  tts: null,
  categories: [],
  translations: [],
};

export default AwezaContent;
