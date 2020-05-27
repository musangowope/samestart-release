import React from 'react';
import PropTypes from 'prop-types';
import GenericSection from '../components/GenericSection';
import queryString from 'query-string';
import axios from 'axios';
import formatSyllabusData from '../functions/formatSyllabusData';
import LessonListLinks from '../components/LessonList';
import styled from 'styled-components';
import themed from '../functions/themed';

const SyllabusCard = styled.div`
  border: 2px solid ${(props) => props.theme.colors.primary};
  padding: 10px;
`;

const SyllabusCardTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes[3]};
  color: ${(props) => props.theme.colors.primary};
  padding-bottom: 5px;
  border-bottom: 2px solid ${(props) => props.theme.colors.tertiary};
  margin-bottom: 10px;
`;

const SyllabusView = (props) => {
  const { courseId } = queryString.parse(props.location.search);
  console.log(courseId);
  const [syllabus, setSyllbus] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        `https://deft-cherry.myliftersite.com/wp-json/llms/v1/sections?parent=${courseId}`,
      )
      .then(({ data }) => {
        setSyllbus([...formatSyllabusData(data)]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [courseId]);
  return (
    <GenericSection title="Syllabus View">
      <div className="row">
        {syllabus.map((syllabusItem) => (
          <div className="col-6" key={syllabusItem.sectionId}>
            <SyllabusCard>
              <SyllabusCardTitle>{syllabusItem.title}</SyllabusCardTitle>
              <LessonListLinks sectionId={syllabusItem.sectionId} />
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
