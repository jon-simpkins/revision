import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react'
import './App.css';
import RevisionHeader from './features/revision-header/RevisionHeader';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <RevisionHeader />
      <Switch>
        <Route path="/about">Writing!</Route>
        <Route path="/">
          <div className="Semantic-example">
            <Button as='div' labelPosition='right'>
              <Button icon>
                <Icon name='heart' />
                Like
              </Button>
              <Label as='a' basic pointing='left'>
                2,048
              </Label>
            </Button>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
