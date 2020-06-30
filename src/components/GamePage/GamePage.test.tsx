import React from 'react';
import { render } from '@testing-library/react';
import GamePage from './GamePage';

test('renders learn react link', () => {
  const { getByText } = render(<GamePage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
