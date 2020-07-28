import React from 'react';
import { Router } from '@reach/router';
import HomeView from './views/HomeView';
import SubjectsView from './views/SubjectsView';
import LessonView from './views/LessonView';
import SSNavbar from './components/SSNavbar';
import SyllabusView from './views/SyllabusView';
import MobileNavbar from './components/SSNavbar/MobileNavbar';
import ServiceView from './views/ServiceView';

const App = () => (
  <React.Fragment>
    <SSNavbar />
    <Router>
      <HomeView path="/" />
      <SyllabusView path="syllabus" />
      <SubjectsView path="subjects" />
      <LessonView path="lesson" />
      <ServiceView path="service" />
    </Router>
    <MobileNavbar />
  </React.Fragment>
);
App.propTypes = {};
App.defaultProps = {};

export default App;
