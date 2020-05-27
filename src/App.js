import React from 'react';
import { Router } from '@reach/router';
import HomeView from './views/HomeView';
import SubjectsView from './views/SubjectsView';
import LessonView from './views/LessonView';
import QuizView from './views/QuizView';
import SSNavbar from './components/SSNavbar';
import SyllabusView from './views/SyllabusView';

const App = (props) => (
  <React.Fragment>
    <SSNavbar />
    <Router>
      <HomeView path="/" />
      <SyllabusView path="syllabus" />
      <SubjectsView path="subjects" />
      <LessonView path="lesson" />
      <QuizView path="quiz" />
    </Router>
  </React.Fragment>
);
App.propTypes = {};
App.defaultProps = {};

export default App;
