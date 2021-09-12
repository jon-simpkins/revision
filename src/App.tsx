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

function App() {
  return (
    <Router>
      <RevisionHeader />
      <Switch>
        <Route path="/story/:id" component={StoryDetails} />
        <Route path="/" component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
