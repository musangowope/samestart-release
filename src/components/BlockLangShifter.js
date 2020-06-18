import React from 'react';
import PropTypes from 'prop-types';
import Accordion from './Accordion';
import BlockTypeInterpreter from './BlockTypeInterpreter';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';
import themed from '../functions/themed';
import { toTitleCase } from '../functions/stringFormatting.func';

const LangButton = styled.button`
  //display: block;
  //background-color: red;
  width: 200px;
  border: none;
`;

const BlockLangShifter = ({ block, blockKey }) => {
  const [currentLang, setCurrentLanguage] = React.useState('english');
  const selectableLangs = Object.keys(block);
  const blockFragment = block[currentLang];

  React.useEffect(() => {
    console.log(currentLang);
  }, [currentLang]);

  return (
    <Accordion
      pressPointContent={
        <BlockTypeInterpreter
          blockName={blockFragment.blockName}
          innerHTML={blockFragment.innerHTML}
          innerBlocks={blockFragment.innerBlocks}
          innerContent={blockFragment.innerContent}
        />
      }
    >
      <button type="button" data-for={blockKey} data-event="click">
        Translate
      </button>
      <Tooltip
        id={blockKey}
        position="bottom"
        effect="solid"
        clickable={true}
      >
        {selectableLangs.map((lang, key) => (
          <LangButton
            type="button"
            key={key}
            onClick={() => setCurrentLanguage(lang)}
          >
            {toTitleCase(lang)}
          </LangButton>
        ))}
      </Tooltip>
    </Accordion>
  );
};

BlockLangShifter.propTypes = {
  block: PropTypes.object,
  blockKey: PropTypes.string,
};
BlockLangShifter.defaultProps = {
  block: {},
  blockKey: '',
};

export default themed(BlockLangShifter);
