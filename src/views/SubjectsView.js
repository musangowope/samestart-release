import React from 'react';
import GenericSection from '../components/GenericSection';
import SubjectAccordion from '../components/SubjectAccordion';
import axios from 'axios';
import api from 'constants/api';
import { baseRequestState } from '../constants/baseRequest';
import themed from '../functions/themed';
import ShapedBackground from '../components/ShapedBackground';
import SSNavbar from '../components/SSNavbar';

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
    <React.Fragment>
      <SSNavbar />
      <ShapedBackground>
        <GenericSection title="Subjects" contentIsLoading={loading}>
          {success ? (
            <div className="columns is-multiline">
              {subjects.length ? (
                subjects.map((subject, key) => (
                  <div className="column is-half" key={key}>
                    <SubjectAccordion
                      subjectName={subject.subject_name}
                      gradesSelection={subject.grades}
                    />
                  </div>
                ))
              ) : (
                <div className="column">No Subjects</div>
              )}
            </div>
          ) : null}
          {failed ? <div>Something went wrong</div> : null}
        </GenericSection>
      </ShapedBackground>
    </React.Fragment>
  );
};

SubjectsView.propTypes = {};
SubjectsView.defaultProps = {};

export default themed(SubjectsView);
