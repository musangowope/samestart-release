import React from 'react';
import { Router } from '@reach/router';
import SubjectsView from './views/SubjectsView';
import LessonView from './views/LessonView';
import SyllabusView from './views/SyllabusView';
import ServiceView from './views/ServiceView';
import MaintenanceView from './views/MaintenanceView';
import EntranceView from './views/EntranceView';

const App = () => {
  let inAyoba = process.env.REACT_APP_IN_AYOBA === 'true';
  return (
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
  );
};

export default App;
