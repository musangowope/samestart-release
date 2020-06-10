import React from 'react';
import PropTypes from 'prop-types';

const LessonGauge = ({ numberOfQuestions, activeQNumber }) => {
  const widthStyle = {
    width: `${(activeQNumber / numberOfQuestions) * 100}%`,
  };
  return (
    <div className="gauge">
      <div className="gauge__title">{`Question ${activeQNumber} of ${numberOfQuestions}`}</div>
      <div className="gauge__body">
        <div className="gauge__body__amount" style={widthStyle} />
      </div>
    </div>
  );
};

LessonGauge.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  activeQNumber: PropTypes.number.isRequired,
};

export default LessonGauge;
