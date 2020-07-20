import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { hasValue } from 'functions/hasValue.func';
import SSRadioButton from 'components/SSRadioButton';
import { createMarkup } from '../../functions/createMarkup.func';
import ErrorMessage from '../ErrorMessage';
import styled from 'styled-components';
import themed from '../../functions/themed';
import HelpContent from './HelpContent';
import AnimationContainer from '../AnimationContainer';
import TransparentButton from '../elements/buttons/TransparentButton';

const QuestionMapper = ({
  questions,
  activeQIndex,
  errorMessage,
  setAnswer,
  setErrorMessage,
  isHelpActive,
}) => {
  const [
    expandToContentHeight,
    setExpandToContentHeight,
  ] = React.useState(false);

  const [showExpandButton, setShowExpandButton] = React.useState(
    false,
  );

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
      return (
        <StyledMultipleChoiceWrapper>
          {question.choices.map((choiceItem, index) =>
            renderSimpleMultipleChoice(choiceItem.choice, index),
          )}
        </StyledMultipleChoiceWrapper>
      );
    } else {
      return null;
    }
  };

  const questionContentRef = React.useRef();
  React.useEffect(() => {
    //TODO: Do resize content
    setShowExpandButton(
      questionContentRef.current.scrollHeight > 300,
    );
  }, []);

  return questions.map((question, index) => (
    <Fragment key={`question=${index}`}>
      {index === activeQIndex && (
        <Fragment>
          {isHelpActive ? (
            <AnimationContainer animatedClassName="animate__fadeInLeft">
              <HelpContent
                title="Help for question"
                content={question.clarifications}
              />
            </AnimationContainer>
          ) : (
            <AnimationContainer animatedClassName="animate__fadeInRight">
              <StyledQuestionContent
                ref={questionContentRef}
                dangerouslySetInnerHTML={createMarkup(
                  question.content,
                )}
                expandToContentHeight={expandToContentHeight}
              />

              {showExpandButton && (
                <StyledExpandButton
                  onClick={() =>
                    setExpandToContentHeight(
                      (prevState) => !prevState,
                    )
                  }
                  type="button"
                >
                  {expandToContentHeight ? 'MINIMIZE -' : 'EXPAND +'}
                </StyledExpandButton>
              )}
              {renderAnswerInput(question.question_type, question)}
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </AnimationContainer>
          )}
        </Fragment>
      )}
    </Fragment>
  ));
};

QuestionMapper.propTypes = {
  questions: PropTypes.array,
  activeQIndex: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  setAnswer: PropTypes.func,
  setErrorMessage: PropTypes.func,
  isHelpActive: PropTypes.bool,
};
QuestionMapper.defaultProps = {
  questions: [],
  errorMessage: '',
  setAnswer: () => false,
  setErrorMessage: () => false,
  isHelpActive: false,
};

export default themed(QuestionMapper);

const StyledQuestionContent = styled.div`
  padding: 20px;
  transition: height 300ms ease-in-out;
  max-height: ${(props) =>
    props.expandToContentHeight ? 'auto' : '200px'};
  overflow: auto;
`;

StyledQuestionContent.defaultProps = {
  expandToContentHeight: false,
};

const StyledMultipleChoiceWrapper = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledExpandButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.tertiary};
  padding: 5px;
  outline: none;
  border: none;
  display: block;
  width: 100%;
`;
