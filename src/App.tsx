import React from 'react';
import './App.css';
import RevisionHeader from './features/revision-header/RevisionHeader';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Homepage from './pages/homepage/Homepage';
import StoryDetailsPage from './pages/story-details/StoryDetailsPage';
import DataManagementPage from './pages/import-export/DataManagementPage';

function App() {
  return (
    <Router>
      <RevisionHeader />
      <Switch>
        <Route path="/data" component={DataManagementPage} />
        <Route path="/story/:id" component={StoryDetailsPage} />
        <Route path="/" component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
