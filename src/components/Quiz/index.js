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

const CorrectMessage = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  border: 2px solid ${(props) => props.theme.colors.success};
`;

const Quiz = ({ title, questions }) => {
  const [activeQIndex, setActiveQIndex] = React.useState(0);
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
    <div>
      <div>{title}</div>
      <LessonGauge
        numberOfQuestions={questions.length}
        activeQNumber={activeQIndex + 1}
      />

      <QuestionMapper
        activeQIndex={activeQIndex}
        questions={questions}
        setAnswer={setAnswer}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      <div className="columns">
        <div className="column">
          <SecondaryButton>Get Help</SecondaryButton>
          <PrimaryButton onClick={handleSubmit}>
            Submit Answer
          </PrimaryButton>
        </div>
        <div className="column">
          {showCongradsMsg && (
            <CorrectMessage>
              Well done, you answer is correct
            </CorrectMessage>
          )}
        </div>
      </div>

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
    </div>
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
