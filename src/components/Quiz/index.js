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

const CorrectMessage = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  border: 2px solid ${(props) => props.theme.colors.success};
`;

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

const Quiz = ({ title, questions }) => {
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
    return setErrorMessage('Incorrect Answers');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      processAnswer();
    }
  };

  return (
    <React.Fragment>
      <QuizTitle>{title}</QuizTitle>
      <LessonGaugeWrapper>
        <LessonGauge
          numberOfQuestions={questions.length}
          activeQNumber={activeQIndex + 1}
        />
      </LessonGaugeWrapper>

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

      {/*<Feedback isCorrect={true} />*/}

      <ActionButtonWrapper>
        <SecondaryButton
          type="button"
          onClick={() => setIsHelpActive((prevState) => !prevState)}
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
          {showCongradsMsg && (
            <CorrectMessage>
              Well done, you answer is correct
            </CorrectMessage>
          )}
          <QuizNavigator
            activeItemIndex={activeQIndex}
            lengthOfItems={questions.length}
            onNext={() => {
              setShowCongradsMsg(false);
              setActiveQIndex(activeQIndex + 1);
            }}
            onPrev={() => {
              setShowCongradsMsg(false);
              setActiveQIndex(activeQIndex - 1);
            }}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Quiz.propTypes = {
  title: Proptypes.string,
  questions: Proptypes.array,
};
Quiz.defaultProps = {
  title: '',
  questions: [],
};

export default themed(Quiz);
