import React from 'react';
import GenericSection from '../components/GenericSection';
import SubjectAccordion from '../components/SubjectAccordion';
import axios from 'axios';
import api from 'constants/api';
import { baseRequestState } from '../constants/baseRequest';
import themed from '../functions/themed';

const SubjectsView = () => {
  const [request, setRequest] = React.useState(baseRequestState);

  const updateRequest = (obj = {}) =>
    setRequest({
      ...baseRequestState,
      ...obj,
    });

  const [subjects, setSubjects] = React.useState([]);
  React.useEffect(() => {
    updateRequest({ loading: true });
    axios
      .get(api.getSubjects())
      .then((res) => {
        updateRequest({ success: true });
        setSubjects([...res.data]);
      })
      .catch((e) => {
        updateRequest({ failed: true });
      });
  }, []);

  const { loading, success, failed } = request;

  return (
    <GenericSection title="Subjects" contentIsLoading={loading}>
      {success && (
        <React.Fragment>
          <div className="columns">
            {subjects.map((subject, key) => (
              <div className="column is-half" key={key}>
                <SubjectAccordion
                  subjectName={subject.subject_name}
                  gradesSelection={subject.grades}
                />
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
      {failed && <div>Something went wrong</div>}
    </GenericSection>
  );
};

SubjectsView.propTypes = {};
SubjectsView.defaultProps = {};

export default themed(SubjectsView);
