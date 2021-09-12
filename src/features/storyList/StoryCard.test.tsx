import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {
  MemoryRouter, Router,
} from 'react-router-dom';
import {createMemoryHistory} from 'history'
import StoryCard from './StoryCard';
import {exampleStory} from './exampleStoryData';

describe('StoryCard', () => {
  test('renders story card', () => {
    render(
        <MemoryRouter><StoryCard story={exampleStory}/></MemoryRouter>
    );
    expect(screen.getByText(exampleStory.name)).toBeInTheDocument();
  });

  test('contains link to story', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}><StoryCard story={exampleStory}/></Router>
    );

    userEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toEqual('/story/abc123');
  });
})

