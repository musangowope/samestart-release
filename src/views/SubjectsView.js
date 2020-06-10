import React from 'react';
import PropTypes from 'prop-types';
import GenericSection from '../components/GenericSection';
import SubjectAccordion from '../components/SubjectAccordion';
import axios from 'axios';
import formatSubjectData from '../functions/formatSubjectData';
import api from 'constants/api';

const SubjectsView = (props) => {
  const [subjects, setSubjects] = React.useState([]);
  React.useEffect(() => {
    axios.get(api.getSubjects()).then((res) => {
      setSubjects([...formatSubjectData(res.data)]);
    });
  }, []);

  return (
    <GenericSection title="Subjects">
      <div className="columns">
        {subjects.map((subject, key) => (
          <div className="column is-half" key={key}>
            <SubjectAccordion
              subjectName={subject.subjectName}
              gradesSelection={subject.gradesSelection}
            />
          </div>
        ))}
      </div>
    </GenericSection>
  );
};

SubjectsView.propTypes = {};
SubjectsView.defaultProps = {};

export default SubjectsView;
