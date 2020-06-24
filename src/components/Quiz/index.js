import React from 'react';
import Proptypes from 'prop-types';
import QuestionMapper from './QuestionMapper';
import LessonGauge from '../LessonGuage';
import QuizNavigator from './QuizNavigator';
import PrimaryButton from '../elements/buttons/PrimaryButton';
import SecondaryButton from '../elements/buttons/SecondaryButton';
import { hasValue } from '../../functions/hasValue.func';
import styled from 'styled-components';
import themed from '../../functions/themed';
import Feedback from './Feedback';
import AnimationContainer from '../AnimationContainer';

const QuizTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes[3]};
  margin-bottom: 10px;
`;

const LessonGaugeWrapper = styled.div`
  margin-bottom: 20px;
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Quiz = ({
  title,
  questions,
  onQuizFinishCb,
  triggerQuizReset,
}) => {
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

  return (
    <React.Fragment>
      <QuizTitle>{title}</QuizTitle>
      <LessonGaugeWrapper>
        <LessonGauge
          numberOfQuestions={questions.length}
          activeQNumber={activeQIndex + 1}
        />
      </LessonGaugeWrapper>

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
          <div className="mb-5">
            <QuestionMapper
              isHelpActive={isHelpActive}
              activeQIndex={activeQIndex}
              questions={questions}
              setAnswer={setAnswer}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </div>

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

          {!isHelpActive && (
            <React.Fragment>
              <QuizNavigator
                activeItemIndex={activeQIndex}
                lengthOfItems={questions.length}
                onNext={() => {
                  setShowCongradsMsg(false);
                  setActiveQIndex(activeQIndex + 1);
                  setAnswer('');
                }}
                onPrev={() => {
                  setShowCongradsMsg(false);
                  setActiveQIndex(activeQIndex - 1);
                  setAnswer('');
                }}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
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
