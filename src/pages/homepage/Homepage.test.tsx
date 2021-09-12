import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Homepage from './Homepage';

test('renders empty message as expected', () => {
  render(
      <Provider store={store}>
        <Homepage />
      </Provider>
  );

  expect(screen.getByText('Whoops, no stories yet')).toBeInTheDocument();
});
