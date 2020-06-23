import React from 'react';
import PropTypes from 'prop-types';
import Accordion from './Accordion';
import BlockTypeInterpreter from './BlockTypeInterpreter';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';
import themed from '../functions/themed';
import { toTitleCase } from '../functions/stringFormatting.func';
import TranslationIconSrc from 'svgs/translation.svg';
import SVG from './SVG';
import TransparentButton from './elements/buttons/TransparentButton';

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
  svg {
    width: 30px;
    height: auto;
  }
`;

const isBlockTranslatable = (block = {}) => {
  const fragments = Object.keys(block)
    .map((langKey) => block[langKey])
    .filter((fragment) => fragment);
  if (fragments.length > 1) {
    return fragments[0].innerHTML !== fragments[1].innerHTML;
  }

  return false;
};

const LangButton = themed((props) => <StyledLangButton {...props} />);

const BlockLangShifter = ({ block, blockKey }) => {
  const [isTippyOpen, setIsTippyOpen] = React.useState(false);
  const [isBlockActive, setIsBlockActive] = React.useState(false);
  const [currentLang, setCurrentLanguage] = React.useState('english');
  const selectableLangs = Object.keys(block);
  const blockFragment = block[currentLang];

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

  const translatable = isBlockTranslatable(block);
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
                    {toTitleCase(lang)}
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
                <SVG src={TranslationIconSrc} />
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
