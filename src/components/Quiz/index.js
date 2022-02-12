import React from 'react';
import Proptypes from 'prop-types';
import QuestionMapper from './QuestionMapper';
import Gauge from '../Gauge';
import PrimaryButton from '../elements/buttons/PrimaryButton';
import SecondaryButton from '../elements/buttons/SecondaryButton';
import { hasValue } from '../../functions/hasValue.func';
import styled from 'styled-components';
import themed from '../../functions/themed';
import Feedback from './Feedback';
import AnimationContainer from '../AnimationContainer';
import InlineSVG from 'react-inlinesvg';
import ArrowLeftSrc from 'svgs/arrow-left.svg';
import ArrowRightSrc from 'svgs/arrow-right.svg';
import CloseSrc from 'svgs/close.svg';
import CircleButton from '../CircleButton';

const Quiz = ({ questions, onQuizFinishCb, triggerQuizReset }) => {
  const [activeQIndex, setActiveQIndex] = React.useState(0);
  const [isHelpActive, setIsHelpActive] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [showCongradsMsg, setShowCongradsMsg] = React.useState(false);

  const isFormValid = () => {
    if (!hasValue(answer)) {
      setErrorMessage('Please fill input');
      return false;
    }

    return true;
  };

  const processAnswer = () => {
    const currentQuestion = questions[activeQIndex];

    const correctAnswer = currentQuestion.choices.filter(
      ({ correct = false }) => correct,
    )[0].choice;
    const isAnswerCorrect = answer === correctAnswer;
    if (isAnswerCorrect) {
      return setShowCongradsMsg(true);
    }
    return setErrorMessage('Incorrect Answer');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      processAnswer();
    }
  };

  const resetQuiz = () => {
    setActiveQIndex(0);
    setShowCongradsMsg(false);
    setErrorMessage('');
    setIsHelpActive(false);
    setAnswer('');
  };

  const handleNextActionAfterCorrect = () => {
    if (questions.length === activeQIndex + 1) {
      resetQuiz();
      return onQuizFinishCb();
    }

    setShowCongradsMsg(false);
    return setActiveQIndex((prevState) => prevState + 1);
  };

  React.useEffect(() => {
    if (triggerQuizReset) {
      resetQuiz();
    }
  }, [triggerQuizReset]);

  const getHeaderTitle = () => {
    return questions.length
      ? `Q ${activeQIndex + 1} of ${questions.length}`
      : '';
  };

  const onPrevButtonClick = () => {
    setShowCongradsMsg(false);
    setActiveQIndex(activeQIndex - 1);
    setAnswer('');
    setIsHelpActive(false);
  };

  const onNextButtonClick = () => {
    setShowCongradsMsg(false);
    setActiveQIndex(activeQIndex + 1);
    setAnswer('');
  };

  return (
    <QuizContainer className="quiz-container">
      <QuestionHeader className="quiz-container__header">
        <div>{getHeaderTitle()}</div>
        <NavigationButtonWrapper>
          <CloseButtonWrapper>
            <CircleButton
              buttonText={<InlineSVG src={CloseSrc} />}
              actionCallback={onQuizFinishCb}
            />
          </CloseButtonWrapper>
          <CircleButton
            disabled={activeQIndex === 0}
            buttonText={<InlineSVG src={ArrowLeftSrc} />}
            actionCallback={onPrevButtonClick}
          />
          <CircleButton
            onClick={onNextButtonClick}
            buttonText={<InlineSVG src={ArrowRightSrc} />}
            type="button"
            disabled={
              activeQIndex + 1 === questions.length ||
              !questions.length
            }
          >
            <InlineSVG src={ArrowRightSrc} />
          </CircleButton>
        </NavigationButtonWrapper>
      </QuestionHeader>

      {questions.length ? (
        <React.Fragment>
          <GaugeWrapper>
            <Gauge
              denominator={questions.length}
              numerator={activeQIndex + 1}
            />
          </GaugeWrapper>
          {showCongradsMsg ? (
            <AnimationContainer animatedClassName="animate__fadeIn">
              <Feedback />
              <div className="has-text-centered">
                <PrimaryButton onClick={handleNextActionAfterCorrect}>
                  {questions.length === activeQIndex + 1
                    ? 'Back To Lesson'
                    : 'Next Question'}
                </PrimaryButton>
              </div>
            </AnimationContainer>
          ) : (
            <React.Fragment>
              <QuestionMapperContainer className="question-mapper-container">
                <QuestionMapper
                  isHelpActive={isHelpActive}
                  activeQIndex={activeQIndex}
                  questions={questions}
                  setAnswer={setAnswer}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              </QuestionMapperContainer>

              <ActionButtonWrapper>
                <SecondaryButton
                  type="button"
                  onClick={() => {
                    setAnswer('');
                    setIsHelpActive((prevState) => !prevState);
                  }}
                >
                  {isHelpActive ? 'Exit Help' : 'Help'}
                </SecondaryButton>
                {!isHelpActive && (
                  <PrimaryButton type="button" onClick={handleSubmit}>
                    Submit
                  </PrimaryButton>
                )}
              </ActionButtonWrapper>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <NoDataContainer>No quiz available</NoDataContainer>
      )}
    </QuizContainer>
  );
};

Quiz.propTypes = {
  title: Proptypes.string,
  questions: Proptypes.array,
  onQuizFinishCb: Proptypes.func,
  triggerQuizReset: Proptypes.bool,
};
Quiz.defaultProps = {
  title: '',
  questions: [],
  onQuizFinishCb: () => false,
  triggerQuizReset: false,
};

export default themed(Quiz);

export const QuestionHeader = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  text-transform: uppercase;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

export const NavigationButtonWrapper = styled.div`
  display: flex;
  flex-flow: nowrap row;
  .ss-circle-button {
    height: 30px;
    width: 30px;
    border-color: ${(props) => props.theme.colors.tertiary};
    background-color: ${(props) => props.theme.colors.tertiary};
  }
`;

export const CloseButtonWrapper = styled.div`
  .ss-circle-button {
    background-color: ${(props) => props.theme.colors.error};
    border-color: ${(props) => props.theme.colors.error};
  }

  svg {
    width: 10px;
    height: auto;
  }
`;

const GaugeWrapper = styled.div`
  //margin-bottom: 20px;
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const QuestionMapperContainer = styled.div`
  //flex-grow: 1;
`;

//TODO: create padding containers
const NoDataContainer = styled.div`
  padding: 10px;
`;
