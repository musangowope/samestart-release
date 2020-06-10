import React from 'react';
import PropTypes from 'prop-types';
import GenericSection from '../components/GenericSection';
import queryString from 'query-string';
import axios from 'axios';
import styled from 'styled-components';
import themed from '../functions/themed';
import { Link } from '@reach/router';
import api from 'constants/api';

const SyllabusCard = styled.div`
  border: 2px solid ${(props) => props.theme.colors.primary};
  padding: 10px;
  height: 100%;
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
`;

const SyllabusView = (props) => {
  const { courseId } = queryString.parse(props.location.search);
  const [courseTitle, setCourseTitle] = React.useState('');
  const [syllabus, setSyllbus] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(api.getSyllabus(courseId))
      .then(({ data }) => {
        setCourseTitle(data.course_title);
        setSyllbus([...data.sections]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [courseId]);
  return (
    <GenericSection title={courseTitle}>
      <div className="columns">
        {syllabus.map((syllabusItem) => (
          <div className="column is-half" key={syllabusItem.section_id}>
            <SyllabusCard>
              <SyllabusCardTitle>
                {syllabusItem.section_title}
              </SyllabusCardTitle>
              <div>
                {syllabusItem.lessons.map((lesson) => (
                  <LessonLink
                    to={`/lesson?lessonId=${lesson.lesson_id}`}
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
    </GenericSection>
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
