import React from 'react';
import PropTypes from 'prop-types';
import GenericSection from '../components/GenericSection';
import queryString from 'query-string';
import axios from 'axios';
import styled from 'styled-components';
import themed from '../functions/themed';
import { Link } from '@reach/router';
import api from 'constants/api';
import { baseRequestState } from '../constants/baseRequest';
import PrimaryButtonLink from '../components/elements/buttons/PrimaryButtonLink';
import { removeWhiteSpaces } from '../functions/removeWhiteSpaces.func';
import ShapedBackground from '../components/ShapedBackground';

const SyllabusCard = styled.div`
  border: 2px solid ${(props) => props.theme.colors.primary};
  padding: 10px;
  height: 100%;
  border-radius: 10px;
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

//TODO: Use course difficulty on the backend
const formalizeCourseTitle = (courseTitle) => {
  const positionOfGrade = courseTitle.indexOf('grade');
  const level = removeWhiteSpaces(
    courseTitle.substring(positionOfGrade + 5, courseTitle.length),
  );
  const courseName = removeWhiteSpaces(
    courseTitle.substring(0, positionOfGrade),
  );
  return `${courseName} Gr ${level}`;
};

const SyllabusView = (props) => {
  const { courseId } = queryString.parse(props.location.search);
  const [courseTitle, setCourseTitle] = React.useState('');
  const [syllabus, setSyllbus] = React.useState([]);

  const [request, setRequest] = React.useState(baseRequestState);

  const updateRequest = (obj = {}) =>
    setRequest({
      ...baseRequestState,
      ...obj,
    });

  React.useEffect(() => {
    updateRequest({ loading: true });
    axios
      .get(api.getSyllabus(courseId))
      .then(({ data }) => {
        updateRequest({ success: true });
        setCourseTitle(data.course_title);
        setSyllbus([...data.sections]);
      })
      .catch((e) => {
        updateRequest({ failed: true });
        console.log(e);
      });
  }, [courseId]);

  const { success, loading, failed } = request;

  return (
    <ShapedBackground>
      <GenericSection title={courseTitle} contentIsLoading={loading}>
        {failed && <div>Failed</div>}
        {success && (
          <React.Fragment>
            <div className="mb-3">
              <BackToCoursesLink to="/subjects">
                Back to Courses
              </BackToCoursesLink>
            </div>
            <div className="columns">
              {syllabus.map((syllabusItem) => (
                <div
                  className="column is-half"
                  key={syllabusItem.section_id}
                >
                  <SyllabusCard>
                    <SyllabusCardTitle>
                      {syllabusItem.section_title}
                    </SyllabusCardTitle>
                    <div>
                      {syllabusItem.lessons.map((lesson) => (
                        <LessonLink
                          to={`/lesson?lessonId=${lesson.lesson_id}&courseId=${courseId}`}
                          key={lesson.lesson_id}
                        >
                          {lesson.lesson_title}
                        </LessonLink>
                      ))}
                    </div>
                  </SyllabusCard>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </GenericSection>
    </ShapedBackground>
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
