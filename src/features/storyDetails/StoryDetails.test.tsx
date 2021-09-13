import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryDetails from './StoryDetails';

describe('StoryDetails', () => {
  test('renders "whoops" message on unfound story', () => {
    render(
        <StoryDetails story={null} onStoryChange={() => {}}/>
    );
    expect(screen.getByText(/Whoops/)).toBeVisible();
  });
});
