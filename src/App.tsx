import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react'
import './App.css';
import RevisionHeader from './features/revision-header/RevisionHeader';

function App() {
  return (
    <div className="App">
      <RevisionHeader />
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
    </div>
  );
}

export default App;
