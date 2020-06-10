import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import axios from 'axios';
import api from 'constants/api';
import styled from 'styled-components';
import GenericSection from '../components/GenericSection';
import AwezaTranslator from '../components/AwezaTranslator';
import GutenBlockTranslator from '../components/GutenBlockTranslator';
import SimpleModal from '../components/SimpleModal';
import { hasValue } from '../functions/hasValue.func';
import { baseRequestState } from '../constants/baseRequest';
import PrimaryButton from '../components/elements/buttons/PrimaryButton';
import Quiz from '../components/Quiz';

const QuizButtonContainer = styled.div`
  margin-bottom: 20px;
  text-align: right;
`;

const QuizModalContainer = styled.div`
  .simple-modal__content {
    padding: 20px;
  }
`;

const LessonView = (props) => {
  const { lessonId } = queryString.parse(props.location.search);
  const [termId, setTermId] = React.useState('');
  const [lessonTitle, setLessonTitle] = React.useState('');
  const [lessonBlocks, setLessonBlocks] = React.useState([]);
  const [requestState, setRequestState] = React.useState(
    baseRequestState,
  );

  const [quiz, setQuiz] = React.useState(null);

  const [isQuizModalActive, setQuizModalActivity] = React.useState(
    false,
  );
  const updateRequest = (obj = {}) => {
    setRequestState({
      ...baseRequestState,
      ...obj,
    });
  };

  const getQuizComponent = () => {
    if (quiz) {
      const { title = '', questions = [] } = quiz;
      return <Quiz title={title} questions={questions} />;
    }

    return 'No quiz data available';
  };

  React.useEffect(() => {
    updateRequest({ loading: true });
    axios
      .get(api.getLesson(lessonId))
      .then(({ data }) => {
        updateRequest({ success: true });
        setLessonTitle(data.default_lesson_instance.title);
        setLessonBlocks(data.parsed_lesson_blocks);
        setQuiz(data.default_lesson_instance.quiz);
      })
      .catch((e) => {
        updateRequest({
          failed: true,
        });
      });
  }, [lessonId]);

  const { success, loading, failed } = requestState;

  return (
    <GenericSection title={lessonTitle}>
      <QuizButtonContainer>
        <PrimaryButton onClick={() => setQuizModalActivity(true)}>
          Take Quiz
        </PrimaryButton>
        <br />
      </QuizButtonContainer>

      {failed && <div>Failed</div>}
      {loading && <div>Loading</div>}
      {success &&
        lessonBlocks.map((block, key) => (
          <GutenBlockTranslator
            key={key}
            blockName={block.blockName}
            innerHTML={block.innerHTML}
            setAwezaId={(id) => setTermId(id)}
          />
        ))}
      <SimpleModal
        isOpen={hasValue(termId)}
        closeAction={() => setTermId('')}
      >
        {termId && <AwezaTranslator termId={termId} />}
      </SimpleModal>

      <QuizModalContainer>
        <SimpleModal
          isOpen={isQuizModalActive}
          closeAction={() => {
            setQuizModalActivity(false);
          }}
        >
          {getQuizComponent()}
        </SimpleModal>
      </QuizModalContainer>
    </GenericSection>
  );
};

LessonView.propTypes = {
  location: PropTypes.object,
};
LessonView.defaultProps = {};

export default LessonView;
