import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders primary call to action', () => {
  render(<App />);
  const ctaButton = screen.getByRole('button', { name: /My Work/i });
  expect(ctaButton).toBeInTheDocument();
});
