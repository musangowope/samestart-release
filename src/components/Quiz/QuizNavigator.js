import React from 'react';
import Arrow from 'svgs/arrow-back.svg';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';

const QuizNavigator = ({
  onPrev,
  onNext,
  activeItemIndex,
  lengthOfItems,
  prevText,
  nextText
}) => {
  return (
    <div className="navigation">
      <button
        type="button"
        className="navigation__button"
        disabled={activeItemIndex === 0}
        onClick={onPrev}
      >
        <span className="navigation__button__image">
          <InlineSVG src={Arrow} />
        </span>
        <span>{prevText}</span>
      </button>
      <button
        type="button"
        className="navigation__button"
        onClick={onNext}
        disabled={activeItemIndex + 1 === lengthOfItems}
      >
        <span>{nextText}</span>
        <span className="navigation__button__image">
          <InlineSVG src={Arrow} />
        </span>
      </button>
    </div>
  );
};

QuizNavigator.propTypes = {
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  activeItemIndex: PropTypes.number,
  lengthOfItems: PropTypes.number,
  prevText: PropTypes.string,
  nextText: PropTypes.string,
};

QuizNavigator.defaultProps = {
  onPrev: () => null,
  onNext: () => null,
  activeItemIndex: 0,
  lengthOfItems: [],
  prevText: 'Prev',
  nextText: 'Skip',
};

export default QuizNavigator;
