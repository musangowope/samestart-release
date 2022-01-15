import React from 'react';
import { Router } from '@reach/router';
import SubjectsView from './views/SubjectsView';
import LessonView from './views/LessonView';
import SyllabusView from './views/SyllabusView';
import EntranceView from './views/EntranceView';

const App = () => {
  return (
    <Router>
      <EntranceView path="/" />
      <SyllabusView path="syllabus" />
      <SubjectsView path="subjects" />
      <LessonView path="lesson" />
    </Router>
  );
};

export default App;
