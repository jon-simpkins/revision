import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Button, Icon, Label } from 'semantic-ui-react'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
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
