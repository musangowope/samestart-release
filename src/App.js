import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Router, Location } from '@reach/router';
import SubjectsView from './views/SubjectsView';
import LessonView from './views/LessonView';
import SyllabusView from './views/SyllabusView';
import ServiceView from './views/ServiceView';
import MaintenanceView from './views/MaintenanceView';
import EntranceView from './views/EntranceView';

const ServiceViewGlobalStylOverride = createGlobalStyle`
html,
body,
div[id='root'] {
    height: calc(100vh - 50px);
   
}
`;

const App = () => {
  let inAyoba = process.env.REACT_APP_IN_AYOBA === 'true';
  return (
    <Location>
      {({ location: { pathname } }) => (
        <React.Fragment>
          {pathname === '/service' ? (
            <ServiceViewGlobalStylOverride />
          ) : null}
          <Router>
            {inAyoba ? (
              <React.Fragment>
                <EntranceView path="/" />
                <SyllabusView path="syllabus" />
                <SubjectsView path="subjects" />
                <LessonView path="lesson" />
                <ServiceView path="service" />
              </React.Fragment>
            ) : (
              <MaintenanceView path="/" />
            )}
          </Router>
        </React.Fragment>
      )}
    </Location>
  );
};
App.propTypes = {};
App.defaultProps = {};

export default App;
