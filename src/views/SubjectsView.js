import React from 'react';
import PropTypes from 'prop-types';
import GenericSection from '../components/GenericSection';
import SubjectAccordion from '../components/SubjectAccordion';
import axios from 'axios';
import llmsAuthHeaders from '../functions/llmsAuthHeaders';
import formatSubjectData from '../functions/formatSubjectData';

const SubjectsView = (props) => {
  const [subjects, setSubjects] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        'https://deft-cherry.myliftersite.com/wp-json/llms/v1/courses',
        {
        headers: llmsAuthHeaders,
      })
      .then((res) => {
        setSubjects([...formatSubjectData(res.data)]);
      });
  }, []);

  return (
    <GenericSection title="Subjects">
      <div className="row">
        {subjects.map((subject, key) => (
          <div className="col-6" key={key}>
            <SubjectAccordion
              subjectName={subject.subjectName}
              gradesSelection={subject.gradesSelection}
            />
          </div>
        ))}
        {/*<div className="col-6">*/}
        {/*  <SubjectAccordion subjectName="Maths" />*/}
        {/*</div>*/}
        {/*<div className="col-6">*/}
        {/*  <SubjectAccordion subjectName="Maths" />*/}
        {/*</div>*/}
      </div>
    </GenericSection>
  );
};

SubjectsView.propTypes = {};
SubjectsView.defaultProps = {};

export default SubjectsView;
