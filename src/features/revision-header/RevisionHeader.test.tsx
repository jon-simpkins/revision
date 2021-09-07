import React from 'react';
import { render, screen } from '@testing-library/react';
import RevisionHeader from './RevisionHeader';

test('renders with h1', () => {
  render(
      <RevisionHeader/>
  );
  expect(screen.getByRole('heading')).toHaveTextContent('Revision');
});
