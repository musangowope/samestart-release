import React from 'react';
import queryString from 'query-string';
import api from 'constants/api';
import styled from 'styled-components';
import GenericSection from '../../components/GenericSection';
import SimpleModal from '../../components/SimpleModal';
import PrimaryButton from '../../components/elements/buttons/PrimaryButton';
import Quiz, {
  CloseButtonWrapper,
  NavigationButtonWrapper,
  QuestionHeader,
} from '../../components/Quiz';
import TertiaryButton from '../../components/elements/buttons/TertiaryButton';
import themed from '../../functions/themed';
import BlockLangShifter from '../../components/BlockLangShifter';
import TertiaryButtonLink from '../../components/elements/buttons/TertiaryButtonLink';
import SSNavbar from '../../components/SSNavbar';
import useAxios from '../../custom-hooks/useAxios';
import Loader from '../../components/Loader';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import CircleButton from '../../components/CircleButton';
import InlineSVG from 'react-inlinesvg';
import CloseSrc from '../../svgs/close.svg';
import TutorialVideoSrc from '../../videos/translating-content-tutorial.mp4';
import TranslationIconSrc from '../../svgs/translation.svg';
import EllipsisIconSrc from '../../svgs/ellipsis.svg';

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

const TutorialIcon = styled(InlineSVG)`
  width: 30px;
  height: auto;
  margin-left: 5px;
  margin-right: 5px;
`;

const TutorialVideo = styled.video`
  height: 200px;
`;

const LessonView = (props) => {
  const {
    lessonId,
    courseId,
    quizId: quizIdParam,
  } = queryString.parse(props.location.search);

  const [quizId, setQuizId] = React.useState(quizIdParam);
  const [showHelpModal, setShowHelpModal] = React.useState(false);

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

  React.useEffect(() => {
    if (
      lessonReqSuccess &&
      !localStorage.getItem('dont_show_tutorial')
    ) {
      setShowHelpModal(true);
    }
  }, [lessonReqSuccess]);

  const handleDontShowCheckboxChange = (e) => {
    if (e.target.checked) {
      localStorage.setItem('dont_show_tutorial', true);
    }
  };

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
      <SimpleModal
        isOpen={showHelpModal}
        closeAction={() => {
          setShowHelpModal(false);
        }}
      >
        <QuestionHeader className="quiz-container__header">
          <div>Changing content to other languages</div>
          <NavigationButtonWrapper>
            <CloseButtonWrapper>
              <CircleButton
                buttonText={<InlineSVG src={CloseSrc} />}
                actionCallback={() => setShowHelpModal(false)}
              />
            </CloseButtonWrapper>
          </NavigationButtonWrapper>
        </QuestionHeader>
        <TutorialVideo autoPlay controls>
          <source src={TutorialVideoSrc} type="video/mp4" />
        </TutorialVideo>
        <div className="p-4">
          <p>
            For a visual guide of how to change lesson content to
            another language, watch the video above or follow the
            steps below
          </p>
          <ol>
            <li>
              Simply click on a paragraph with that follows with a
              blue ellipsis icon.{' '}
              <TutorialIcon src={EllipsisIconSrc} />
            </li>
            <li>
              <p>
                When you click on the paragraph, the text will
                highlight and a speech icon will appear.
                <TutorialIcon src={TranslationIconSrc} />
              </p>
              <p>Click on this icon to show the language selection</p>
            </li>
            <li>
              Choose an available language to translate the content to
            </li>
          </ol>
          <div>
            <label className="checkbox">
              <input
                type="checkbox"
                onChange={handleDontShowCheckboxChange}
              />{' '}
              Dont show me this again
            </label>
          </div>
        </div>
      </SimpleModal>
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
