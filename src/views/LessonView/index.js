import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import api from 'constants/api';
import styled from 'styled-components';
import GenericSection from '../../components/GenericSection';
import AwezaTranslator from '../../components/AwezaTranslator';
import BlockTypeInterpreter from '../../components/BlockTypeInterpreter';
import SimpleModal from '../../components/SimpleModal';
import { hasValue } from '../../functions/hasValue.func';
import { baseRequestState } from '../../constants/baseRequest';
import PrimaryButton from '../../components/elements/buttons/PrimaryButton';
import Quiz from '../../components/Quiz';
import TertiaryButton from '../../components/elements/buttons/TertiaryButton';
import themed from '../../functions/themed';
import BlockLangShifter from '../../components/BlockLangShifter';

const LessonButtonsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const ModalContainer = styled.div`
  .simple-modal__content {
    padding: 20px;
  }
`;

const CloseButtonWrapper = styled.div`
  margin-bottom: 20px;
  text-align: right;
`;

const LessonContent = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-bottom: 10px;
  }
  h1 {
    font-size: ${(props) => props.theme.fontSizes[6]};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes[5]};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizes[4]};
  }

  h4 {
    font-size: ${(props) => props.theme.fontSizes[3]};
  }

  h5 {
    font-size: ${(props) => props.theme.fontSizes[2]};
  }
  [data-aweza-id] {
    color: #ff8600;
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
        console.log(data);
        updateRequest({ success: true });
        setLessonTitle(data.default_lesson_instance.title);
        setLessonBlocks(data.translated_blocks);
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
    <GenericSection title={lessonTitle} hasMobileFooter>
      <LessonButtonsContainer>
        <TertiaryButton>Back</TertiaryButton>
        <PrimaryButton onClick={() => setQuizModalActivity(true)}>
          Take Quiz
        </PrimaryButton>
      </LessonButtonsContainer>

      {failed && <div>Failed</div>}
      {loading && <div>Loading</div>}
      {success && (
        <LessonContent>
          {lessonBlocks.map((block, key) => (
            <BlockLangShifter block={block} key={key} blockKey={`block-key-${key}`}  />
          ))}
        </LessonContent>
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
          closeAction={() => {
            setQuizModalActivity(false);
          }}
        >
          <CloseButtonWrapper>
            <TertiaryButton
              onClick={() => setQuizModalActivity(false)}
            >
              Close
            </TertiaryButton>
          </CloseButtonWrapper>
          {getQuizComponent()}
        </SimpleModal>
      </ModalContainer>
    </GenericSection>
  );
};

LessonView.propTypes = {
  location: LessonView.object,
};

export default themed(LessonView);
