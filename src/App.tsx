import React from 'react';
import './App.css';
import RevisionHeader from './features/revision-header/RevisionHeader';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Homepage from './pages/homepage/Homepage';
import StoryDetails from './pages/story-details/StoryDetails';
import DataManagementPage from './pages/import-export/DataManagementPage';

function App() {
  return (
    <Router>
      <RevisionHeader />
      <Switch>
        <Route path="/data" component={DataManagementPage} />
        <Route path="/story/:id" component={StoryDetails} />
        <Route path="/" component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
