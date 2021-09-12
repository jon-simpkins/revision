import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  MemoryRouter,
} from 'react-router-dom';
import RevisionHeader from './RevisionHeader';

test('renders with h1', () => {
  render(
      <MemoryRouter><RevisionHeader/></MemoryRouter>
  );
  expect(screen.getByRole('heading')).toHaveTextContent('Revision');
});
