import React from 'react';
import GenericSection from '../components/GenericSection';
import SubjectAccordion from '../components/SubjectAccordion';
import api from 'constants/api';
import themed from '../functions/themed';
import ShapedBackground from '../components/ShapedBackground';
import SSNavbar from '../components/SSNavbar';
import useAxios from '../custom-hooks/useAxios';

const SubjectsView = () => {
  const subjectsRequest = useAxios(
    api.getSubjects(),
    'get',
    null,
    500,
  );

  const {
    loading,
    success,
    failed,
    response: subjects = [],
  } = subjectsRequest;

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

export default themed(SubjectsView);
