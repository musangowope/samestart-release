import React from 'react';
import Arrow from 'svgs/arrow-back.svg';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';

const QuizNavigator = ({
  onPrev = () => null,
  onNext = () => null,
  activeItemIndex = 0,
  lengthOfItems = [],
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
        <span>Prev</span>
      </button>
      <button
        type="button"
        className="navigation__button"
        onClick={onNext}
        disabled={activeItemIndex + 1 === lengthOfItems}
      >
        <span>Skip</span>
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
};
export default QuizNavigator;
