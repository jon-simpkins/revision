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
import ScrapDetailsPage from './pages/scrap-details/ScrapDetailsPage';
import DecisionPage from './pages/decisions/DecisionPage';
import ReadScrapPage from './pages/read-scrap/ReadScrapPage';

function App() {
  return (
      <div style={{padding: 0, margin: 0, height: '100vh'}}>
    <Router >
      <RevisionHeader />
      <div style={{
        height: 'calc(100% - 68px)',
      }}>
        <Switch>
          <Route path="/decisions" component={DecisionPage} />
          <Route path="/data" component={DataManagementPage} />
          <Route path="/story/:id" component={StoryDetailsPage} />
          <Route path="/scrap/:id" component={ScrapDetailsPage} />
          <Route path="/read/:id" component={ReadScrapPage} />
          <Route path="/" component={Homepage} />
        </Switch>
      </div>
    </Router>
      </div>
  );
}

export default App;
