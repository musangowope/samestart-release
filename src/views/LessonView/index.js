import React from 'react';
import queryString from 'query-string';
import api from 'constants/api';
import styled from 'styled-components';
import GenericSection from '../../components/GenericSection';
import AwezaTranslator from '../../components/AwezaTranslator';
import SimpleModal from '../../components/SimpleModal';
import { hasValue } from '../../functions/hasValue.func';
import PrimaryButton from '../../components/elements/buttons/PrimaryButton';
import Quiz from '../../components/Quiz';
import TertiaryButton from '../../components/elements/buttons/TertiaryButton';
import themed from '../../functions/themed';
import BlockLangShifter from '../../components/BlockLangShifter';
import TertiaryButtonLink from '../../components/elements/buttons/TertiaryButtonLink';
import SSNavbar from '../../components/SSNavbar';
import useAxios from '../../custom-hooks/useAxios';
import Loader from '../../components/Loader';

const LessonButtonsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const ModalContainer = styled.div`
  .simple-modal__content {
    //padding: 20px;
  }
`;

const CloseButtonWrapper = styled.div`
  margin-bottom: 20px;
  text-align: right;
`;

const LessonView = (props) => {
  const { lessonId, courseId } = queryString.parse(
    props.location.search,
  );
  const [termId, setTermId] = React.useState('');
  const [isQuizModalActive, setQuizModalActivity] = React.useState(
    false,
  );


  const lessonRequest = useAxios(api.getLesson(lessonId));
  const quizRequest = useAxios(
    isQuizModalActive ? api.getQuizByLessonId(lessonId) : '',
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

  const {
    response: { title: quizTitle = '', questions = [] } = {},
  } = quizRequest;

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
          <PrimaryButton
            onClick={() => {
              setQuizModalActivity(true);
            }}
          >
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

        <ModalContainer>
          <SimpleModal
            isOpen={hasValue(termId)}
            closeAction={() => setTermId('')}
          >
            <CloseButtonWrapper>
              <TertiaryButton onClick={() => setTermId('')}>
                Close
              </TertiaryButton>
            </CloseButtonWrapper>
            {termId && <AwezaTranslator termId={termId} />}
          </SimpleModal>
        </ModalContainer>

        <ModalContainer>
          <SimpleModal
            isOpen={isQuizModalActive}
            closeAction={() => setQuizModalActivity(false)}
          >
            {quizRequest.failed && (
              <div className="p2">
                <div className="has-text-right mb-1">
                  <TertiaryButton onClick={() => setQuizModalActivity(false)}>
                    Close
                  </TertiaryButton>
                </div>
                <div>Could not load data</div>
              </div>
            )}
            {quizRequest.loading && <Loader />}
            {quizRequest.success && (
              <React.Fragment>
                <Quiz
                  title={quizTitle}
                  questions={questions}
                  triggerQuizReset={!isQuizModalActive}
                  onQuizFinishCb={() => setQuizModalActivity(false)}
                />
              </React.Fragment>
            )}
          </SimpleModal>
        </ModalContainer>
      </GenericSection>
    </React.Fragment>
  );
};

LessonView.propTypes = {
  location: LessonView.object,
};

export default themed(LessonView);
