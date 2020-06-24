import React from 'react';
import PropTypes from 'prop-types';
import EquationTranslator from './EquationTranslator';
import { createMarkup } from '../functions/createMarkup.func';
import styled from 'styled-components';
import themed from '../functions/themed';
import EllipsisIconSrc from 'svgs/ellipsis.svg';
import SVG from './SVG';

const TranslatableIconContainer = styled.div`
  svg {
    width: 35px;
    height: auto;
    display: flex;
  }
`;

const BlockContentContainer = styled.div`
  //margin-bottom: 15px;
`;

const BlockContent = styled.div`
  transition: 500ms ease-in-out;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-bottom: 10px;
  }
  h1 {
    font-size: ${(props) => props.theme.fontSizes[6]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes[5]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizes[4]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  h4 {
    font-size: ${(props) => props.theme.fontSizes[3]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  h5 {
    font-size: ${(props) => props.theme.fontSizes[2]};
    color: ${(props) => props.theme.colors.primary} !important;
    strong {
      color: ${(props) => props.theme.colors.primary} !important;
    }
  }

  outline: none !important;

  color: ${(props) =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.base};
`;

const getEquationElement = (html = '') => {
  const katexNode = document.createElement('div');
  katexNode.innerHTML = html;
  const katex = katexNode.querySelector(
    '.wp-block-katex-display-block',
  ).innerHTML;
  return <EquationTranslator passedDownLatex={katex} />;
};

const BlockTypeInterpreter = ({
  blockName,
  innerHTML,
  setAwezaId,
  isActive,
  translatable,
}) => {
  const handleBlockClick = (e) => {
    const element = e.target.closest('[data-aweza-id]');
    if (element && e.currentTarget.contains(element)) {
      const awezaId = element.dataset.awezaId;
      setAwezaId(awezaId);
    }
  };

  const getBlockContent = () => {
    switch (blockName) {
      case 'katex/display-block':
        return getEquationElement(innerHTML);
      default: {
        return (
          <BlockContent
            translatable={translatable}
            isActive={isActive}
            dangerouslySetInnerHTML={createMarkup(innerHTML)}
            // onKeyPress={() => null}
            role="button"
            tabIndex={1}
            // onClick={handleBlockClick}
          />
        );
      }
    }
  };

  return (
    <BlockContentContainer>
      {getBlockContent()}
      {translatable && (
        <TranslatableIconContainer>
          <SVG src={EllipsisIconSrc} />
        </TranslatableIconContainer>
      )}
    </BlockContentContainer>
  );
};

BlockTypeInterpreter.propTypes = {
  blockName: PropTypes.string,
  innerBlocks: PropTypes.array,
  innerHTML: PropTypes.any,
  innerContent: PropTypes.any,
  setAwezaId: PropTypes.func,
  isActive: PropTypes.bool,
  translatable: PropTypes.bool,
};
BlockTypeInterpreter.defaultProps = {
  blockName: '',
  innerBlocks: [],
  innerHTML: '',
  setAwezaId: () => false,
  isActive: false,
  translatable: false,
};

export default themed(BlockTypeInterpreter);
