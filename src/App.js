import React from 'react';
import { Router } from '@reach/router';
import HomeView from './views/HomeView';
import SubjectsView from './views/SubjectsView';
import LessonView from './views/LessonView';
import SSNavbar from './components/SSNavbar';
import SyllabusView from './views/SyllabusView';
import ServiceView from './views/ServiceView';
import { getAyoba } from './functions/getAyoba.func';
import MaintenanceView from './views/MaintenanceView';

const baseContextState = {
  contextState: {
    mobileNavbarActive: true,
  },
  setContext: () => null,
};

export const GlobalContext = React.createContext(baseContextState);

const App = () => {
  const [context, setContext] = React.useState(baseContextState);
  const contextObj = {
    contextState: context.contextState,
    setContext,
  };
  let inAyoba = getAyoba();
  return (
    <GlobalContext.Provider value={contextObj}>
      {inAyoba && <SSNavbar />}
      <Router>
        {inAyoba ? (
          <React.Fragment>
            <HomeView path="/" />
            <SyllabusView path="syllabus" />
            <SubjectsView path="subjects" />
            <LessonView path="lesson" />
            <ServiceView path="service" />
          </React.Fragment>
        ) : (
          <MaintenanceView path="/" />
        )}
      </Router>
    </GlobalContext.Provider>
  );
};
App.propTypes = {};
App.defaultProps = {};

export default App;
