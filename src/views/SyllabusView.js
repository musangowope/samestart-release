import React from 'react';
import PropTypes from 'prop-types';
import GenericSection from '../components/GenericSection';
import queryString from 'query-string';
import styled from 'styled-components';
import themed from '../functions/themed';
import { Link, navigate } from '@reach/router';
import api from 'constants/api';
import PrimaryButtonLink from '../components/elements/buttons/PrimaryButtonLink';
import ShapedBackground from '../components/ShapedBackground';
import SSNavbar from '../components/SSNavbar';
import TertiaryButton from '../components/elements/buttons/TertiaryButton';
import SimpleModal from '../components/SimpleModal';
import { hasValue } from '../functions/hasValue.func';
import useAxios from '../custom-hooks/useAxios';
import Loader from '../components/Loader';
import Quiz from '../components/Quiz';

const SyllabusView = (props) => {
  const { courseId, lessonIdForExam = '' } = queryString.parse(
    props.location.search,
  );

  const [showExamSections, setShowExamSections] = React.useState(
    false,
  );

  const toggleShowExamSectionsState = () =>
    setShowExamSections((prevState) => !prevState);

  const getLink = (lessonId = '') => {
    if (showExamSections) {
      return `/syllabus?courseId=${courseId}&lessonIdForExam=${lessonId}`;
    }
    return `/lesson?lessonId=${lessonId}&courseId=${courseId}`;
  };

  const syllabusRequest = useAxios(api.getSyllabus(courseId));

  const {
    response: {
      course_title = '',
      exam_sections = [],
      non_exam_sections = [],
    } = {},
  } = syllabusRequest;

  const handleCloseExamModal = () =>
    navigate(`syllabus?courseId=${courseId}`);

  const quizRequest = useAxios(
    api.getQuizByLessonId(lessonIdForExam),
  );

  const {
    response: { title: quizTitle = '', questions = [] } = {},
  } = quizRequest;

  const renderSections = (sections = []) => {
    return sections.map((syllabusItem) => (
      <div className="column is-half" key={syllabusItem.section_id}>
        <SyllabusCard>
          <SyllabusCardTitle>
            {syllabusItem.section_title}
          </SyllabusCardTitle>
          <div>
            {syllabusItem.lessons.map((lesson) => (
              <LessonLink
                to={getLink(lesson.lesson_id)}
                key={lesson.lesson_id}
              >
                {lesson.lesson_title}
              </LessonLink>
            ))}
          </div>
        </SyllabusCard>
      </div>
    ));
  };

  return (
    <React.Fragment>
      <SSNavbar />
      <ShapedBackground>
        <GenericSection
          title={course_title}
          contentIsLoading={syllabusRequest.loading}
        >
          {syllabusRequest.failed && <div>Failed</div>}
          {syllabusRequest.success && (
            <React.Fragment>
              <StyledActionButtonWrapper>
                <BackToCoursesLink to="/subjects">
                  Back to Courses
                </BackToCoursesLink>
                <TertiaryButton onClick={toggleShowExamSectionsState}>
                  {showExamSections ? 'Lessons' : 'Exams'}
                </TertiaryButton>
              </StyledActionButtonWrapper>
              <div className="columns">
                {renderSections(
                  showExamSections
                    ? exam_sections
                    : non_exam_sections,
                )}
              </div>
              <SimpleModal
                isOpen={hasValue(lessonIdForExam)}
                closeAction={handleCloseExamModal}
              >
                {quizRequest.failed && (
                  <div className="p2">
                    <div className="has-text-right mb-1">
                      <TertiaryButton onClick={handleCloseExamModal}>
                        Close
                      </TertiaryButton>
                    </div>
                    <div>No quiz data available</div>
                  </div>
                )}
                {quizRequest.loading && <Loader />}
                {quizRequest.success && (
                  <React.Fragment>
                    <Quiz
                      title={quizTitle}
                      questions={questions}
                      triggerQuizReset={!hasValue(lessonIdForExam)}
                      onQuizFinishCb={handleCloseExamModal}
                    />
                  </React.Fragment>
                )}
              </SimpleModal>
            </React.Fragment>
          )}
        </GenericSection>
      </ShapedBackground>
    </React.Fragment>
  );
};

SyllabusView.propTypes = {
  courseId: PropTypes.string,
  location: PropTypes.object,
};
SyllabusView.defaultProps = {
  courseId: '',
  location: {},
};

export default themed(SyllabusView);

const StyledActionButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 20px;
  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.sm}) {
    justify-content: space-between;
  }

  @media screen and (max-width: ${(props) =>
      props.theme.breakpoints.xs}) {
    display: block;
    margin-bottom: 10px;

    a,
    button {
      width: 100%;
      margin-bottom: 10px;
      text-align: center;
    }
  }
`;

const SyllabusCard = styled.div`
  border: 2px solid ${(props) => props.theme.colors.primary};
  padding: 10px;
  height: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.white};
`;

const BackToCoursesLink = styled(PrimaryButtonLink)`
  display: inline-block;
`;

const SyllabusCardTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes[3]};
  color: ${(props) => props.theme.colors.primary};
  padding-bottom: 5px;
  border-bottom: 2px solid ${(props) => props.theme.colors.tertiary};
  margin-bottom: 10px;
`;

const LessonLink = styled(Link)`
  display: block;
  color: ${(props) => props.theme.colors.tertiary};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.tertiary};
  }
`;
