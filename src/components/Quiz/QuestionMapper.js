import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { hasValue } from 'functions/hasValue.func';
import SSRadioButton from 'components/SSRadioButton';
import { createMarkup } from '../../functions/createMarkup.func';
import ErrorMessage from '../ErrorMessage';

const QuestionMapper = ({
  questions,
  activeQIndex,
  errorMessage,
  setAnswer,
  setErrorMessage,
}) => {
  const renderSimpleMultipleChoice = (value, id) => (
    <SSRadioButton
      key={`quiz-option-${id}`}
      onChange={(value) => {
        setErrorMessage('');
        setAnswer(value);
      }}
      name="quiz-option"
      value={value}
      renderContent={() => value}
      hasError={hasValue(errorMessage)}
    />
  );

  const renderAnswerInput = (answerType, question) => {
    // Will be a switch statement later when there are more answer types
    if (answerType === 'choice') {
      return question.choices.map((choiceItem, index) =>
        renderSimpleMultipleChoice(choiceItem.choice, index),
      );
    } else {
      return null;
    }
  };

  return (
    <Fragment>
      {questions.map((question, index) => (
        <Fragment key={`question=${index}`}>
          {index === activeQIndex && (
            <Fragment>
              <div>Question {index + 1}</div>
              <div
                dangerouslySetInnerHTML={createMarkup(
                  question.content,
                )}
              />
              {renderAnswerInput(question.question_type, question)}
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </Fragment>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

QuestionMapper.propTypes = {
  questions: PropTypes.array,
  activeQIndex: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  setAnswer: PropTypes.func,
  setErrorMessage: PropTypes.func,
};
QuestionMapper.defaultProps = {
  questions: [],
  errorMessage: '',
  setAnswer: () => false,
  setErrorMessage: () => false,
};

export default QuestionMapper;
