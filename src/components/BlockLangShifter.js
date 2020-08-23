import React from 'react';
import PropTypes from 'prop-types';
import Accordion from './Accordion';
import BlockTypeInterpreter from './BlockTypeInterpreter';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';
import themed from '../functions/themed';
import TranslationIconSrc from 'svgs/translation.svg';
import TransparentButton from './elements/buttons/TransparentButton';
import ISO6391 from 'iso-639-1';
import InlineSVG from 'react-inlinesvg';

const StyledLangButton = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  width: 250px;
  border: none;
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TranslateIconSvgWrapper = styled.span`
  display: inline-block;
  margin-top: 10px;
  svg {
    width: 30px;
    height: auto;
  }
`;
const LangButton = themed((props) => <StyledLangButton {...props} />);

const BlockLangShifter = ({ block, blockKey }) => {
  const [isTippyOpen, setIsTippyOpen] = React.useState(false);
  const [isBlockActive, setIsBlockActive] = React.useState(false);
  const [currentLang, setCurrentLanguage] = React.useState('en');
  const selectableLangs = Object.keys(block.translations);
  const blockFragment = block.translations[currentLang];

  const translatable = block.translatable;

  const getBlock = () => (
    <BlockTypeInterpreter
      blockName={blockFragment.blockName}
      innerHTML={blockFragment.innerHTML}
      innerBlocks={blockFragment.innerBlocks}
      innerContent={blockFragment.innerContent}
      isActive={isBlockActive}
      translatable={translatable}
    />
  );

  if (translatable) {
    return (
      <Accordion
        cbToggleFn={() => setIsBlockActive((prevState) => !prevState)}
        pressPointContent={getBlock()}
      >
        {(close) => (
          <Tooltip
            interactive
            position="bottom"
            onRequestClose={() => setIsTippyOpen(false)}
            open={isTippyOpen}
            html={
              <div>
                {selectableLangs.map((lang, key) => (
                  <LangButton
                    type="button"
                    key={key}
                    onClick={() => {
                      setIsBlockActive(false);
                      setCurrentLanguage(lang);
                      setIsTippyOpen(false);
                      close();
                    }}
                  >
                    {ISO6391.getName(lang)}
                  </LangButton>
                ))}
              </div>
            }
          >
            <TranslateIconSvgWrapper>
              <TransparentButton
                onClick={() =>
                  setIsTippyOpen((prevState) => !prevState)
                }
              >
                <InlineSVG src={TranslationIconSrc} />
              </TransparentButton>
            </TranslateIconSvgWrapper>
          </Tooltip>
        )}
      </Accordion>
    );
  }

  return getBlock();
};

BlockLangShifter.propTypes = {
  block: PropTypes.object,
  blockKey: PropTypes.string,
};
BlockLangShifter.defaultProps = {
  block: {},
  blockKey: '',
};

export default BlockLangShifter;
