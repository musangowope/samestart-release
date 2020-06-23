import React from 'react';
import GenericSection from '../components/GenericSection';
import SubjectAccordion from '../components/SubjectAccordion';
import axios from 'axios';
import formatSubjectData from '../functions/formatSubjectData';
import api from 'constants/api';
import { baseRequestState } from '../constants/baseRequest';
import styled from 'styled-components';
import YenzaImg from 'images/yenza-background.jpg';
import themed from '../functions/themed';

const YenzaLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.colors.tertiary};
  background-image: url("${YenzaImg}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: none;
  height: 100px !important;
  width: 384px;
  padding: 20px;
  color: white;
  font-size: ${(props) => props.theme.fontSizes[3]};
  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
  @media screen and (max-width: ${(props) =>
    props.theme.breakpoints.md}) {
    width: 100%;
    text-align: center;
  }
`;

const YenzaHeading = styled.div`
  font-size: ${(props) => props.theme.fontSizes[4]};
  color: ${(props) => props.theme.colors.base};
  margin-bottom: 20px;
`;

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
        setSubjects([...formatSubjectData(res.data)]);
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
                  subjectName={subject.subjectName}
                  gradesSelection={subject.gradesSelection}
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
