import React from 'react';
import queryString from 'query-string';
import api from 'constants/api';
import styled from 'styled-components';
import GenericSection from '../../components/GenericSection';
import SimpleModal from '../../components/SimpleModal';
import PrimaryButton from '../../components/elements/buttons/PrimaryButton';
import Quiz from '../../components/Quiz';
import TertiaryButton from '../../components/elements/buttons/TertiaryButton';
import themed from '../../functions/themed';
import BlockLangShifter from '../../components/BlockLangShifter';
import TertiaryButtonLink from '../../components/elements/buttons/TertiaryButtonLink';
import SSNavbar from '../../components/SSNavbar';
import useAxios from '../../custom-hooks/useAxios';
import Loader from '../../components/Loader';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

const LessonButtonsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

//TODO: See the best use case for this
export const QuizLoaderWrapper = styled.div`
  position: relative;
  transform: translateY(-50%);
  top: 50%;
`;

const LessonView = (props) => {
  const {
    lessonId,
    courseId,
    quizId: quizIdParam,
  } = queryString.parse(props.location.search);

  const [quizId, setQuizId] = React.useState(quizIdParam);

  React.useEffect(() => {
    setQuizId(quizIdParam);
  }, [quizIdParam]);

  const onTakeQuiz = () => {
    const url = new URL(props.location.href);
    url.searchParams.set('quizId', lessonId);
    navigate(url.href);
  };

  const exitQuiz = () => {
    const url = new URL(props.location.href);
    url.searchParams.delete('quizId');
    navigate(url.href, { replace: true });
  };

  const lessonRequest = useAxios(api.getLesson(lessonId));
  const quizRequest = useAxios(
    quizId ? api.getQuizByLessonId(quizId) : '',
    'get',
    null,
    500,
  );
  const {
    loading: lessonReqLoading,
    success: lessonReqSuccess,
    failed: lessonReqFailed,
    response: {
      translated_blocks = [],
      lesson_title: lessonTitle = '',
    },
  } = lessonRequest;

  const { response: { title: quizTitle = '', questions = [] } = {} } =
    quizRequest;

  return (
    <React.Fragment>
      <SSNavbar />
      <GenericSection
        title={lessonTitle}
        contentIsLoading={lessonReqLoading}
      >
        <LessonButtonsContainer>
          <TertiaryButtonLink to={`/syllabus?courseId=${courseId}`}>
            Back
          </TertiaryButtonLink>
          <PrimaryButton onClick={onTakeQuiz}>
            Take Quiz
          </PrimaryButton>
        </LessonButtonsContainer>

        {lessonReqFailed && <div>Failed</div>}
        {lessonReqSuccess && (
          <React.Fragment>
            {translated_blocks.map((block, key) => (
              <BlockLangShifter
                block={block}
                key={key}
                blockKey={`block-key-${key}`}
              />
            ))}
          </React.Fragment>
        )}
      </GenericSection>
      <SimpleModal isOpen={quizId} closeAction={exitQuiz}>
        {quizRequest.failed && (
          <div className="p2">
            <div className="has-text-right mb-1">
              <TertiaryButton onClick={exitQuiz}>
                Close
              </TertiaryButton>
            </div>
            <div>Could not load data</div>
          </div>
        )}
        {quizRequest.loading && (
          <QuizLoaderWrapper>
            <Loader />
          </QuizLoaderWrapper>
        )}
        {quizRequest.success && (
          <React.Fragment>
            <Quiz
              title={quizTitle}
              questions={questions}
              triggerQuizReset={!quizId}
              onQuizFinishCb={exitQuiz}
            />
          </React.Fragment>
        )}
      </SimpleModal>
    </React.Fragment>
  );
};

LessonView.propTypes = {
  location: PropTypes.object,
};

LessonView.defaultProps = {
  location: {},
};

export default themed(LessonView);
