import React from 'react';
import PropTypes from 'prop-types';
import EquationTranslator from './EquationTranslator';
import { createMarkup } from '../functions/createMarkup.func';

const getEquationElement = (html = '') => {
  const katexNode = document.createElement('div');
  katexNode.innerHTML = html;
  const katex = katexNode.querySelector(
    '.wp-block-katex-display-block',
  ).innerHTML;
  return <EquationTranslator passedDownLatex={katex} />;
};

const GutenBlockTranslator = ({
  blockName,
  innerHTML,
  setAwezaId,
}) => {
  const handleBlockClick = (e) => {
    const element = e.target.closest('[data-aweza-id]');
    if (element && e.currentTarget.contains(element)) {
      const awezaId = element.dataset.awezaId;
      setAwezaId(awezaId);
    }
  };

  switch (blockName) {
    case 'katex/display-block':
      return getEquationElement(innerHTML);
    default: {
      return (
        <div
          dangerouslySetInnerHTML={createMarkup(innerHTML)}
          onKeyPress={() => null}
          role="button"
          tabIndex={1}
          onClick={handleBlockClick}
        />
      );
    }
  }
};

GutenBlockTranslator.propTypes = {
  blockName: PropTypes.string,
  innerBlocks: PropTypes.array,
  innerHTML: PropTypes.any,
  innerContent: PropTypes.any,
  setAwezaId: PropTypes.func,
};
GutenBlockTranslator.defaultProps = {
  blockName: '',
  innerBlocks: [],
  innerHTML: '',
  setAwezaId: () => false,
};

export default GutenBlockTranslator;
