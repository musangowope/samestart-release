import React from 'react';
import { Router } from '@reach/router';
import HomeView from './views/HomeView';
import SubjectsView from './views/SubjectsView';
import LessonView from './views/LessonView';
import SSNavbar from './components/SSNavbar';
import SyllabusView from './views/SyllabusView';
import MobileNavbar from './components/SSNavbar/MobileNavbar';
import YenzaView from './views/YenzaView';

const App = () => (
  <React.Fragment>
    <SSNavbar />
    <Router>
      <HomeView path="/" />
      <SyllabusView path="syllabus" />
      <SubjectsView path="subjects" />
      <LessonView path="lesson" />
      <YenzaView path="yenza" />
    </Router>
    <MobileNavbar />
  </React.Fragment>
);
App.propTypes = {};
App.defaultProps = {};

export default App;
