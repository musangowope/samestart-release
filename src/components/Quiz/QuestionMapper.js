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
import { useGetVPHeight } from '../../custom-hooks/useVp';
import debounced from '../../functions/debounced.func';

const debounceBuilder = debounced(200);

const QuestionMapper = ({
  questions,
  activeQIndex,
  errorMessage,
  setAnswer,
  setErrorMessage,
  isHelpActive,
}) => {
  const [maxHeight, setMaxHeight] = React.useState('auto');
  const [scrollable, setScrollable] = React.useState(false);

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
  const vpHeight = useGetVPHeight();

  const handleQuizContentHeight = React.useCallback(() => {
    if (questionContentRef && questionContentRef.current) {
      const questionContentHeight =
        questionContentRef.current.scrollHeight;
      const comparableHeight = vpHeight * (1.2 / 3);
      const scrollable = questionContentHeight > comparableHeight;
      setMaxHeight(scrollable ? `${comparableHeight}px` : 'auto');
      setScrollable(scrollable);
    }
  }, [vpHeight]);

  React.useEffect(() => {
    handleQuizContentHeight();
    window.addEventListener('resize', () => {
      debounceBuilder(() => handleQuizContentHeight());
    });
    return () => {
      window.removeEventListener('resize', () => {
        debounceBuilder(() => handleQuizContentHeight());
      });
    };
  }, [handleQuizContentHeight]);

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
                maxHeight={maxHeight}
              />

              {scrollable && (
                <StyledScrollPrompt>
                  Scroll up and down
                </StyledScrollPrompt>
              )}

              {renderAnswerInput(question.question_type, question)}
              <StyledQuestionErrorMsg>
                {errorMessage}
              </StyledQuestionErrorMsg>
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
  max-height: ${(props) => props.maxHeight};
  overflow: auto;
`;

StyledQuestionContent.defaultProps = {
  maxHeight: 'auto',
};

const StyledMultipleChoiceWrapper = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledQuestionErrorMsg = styled(ErrorMessage)`
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledScrollPrompt = styled.div`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.tertiary};
  padding: 5px;
  outline: none;
  border: none;
  display: block;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
`;
