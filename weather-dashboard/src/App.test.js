import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders search input', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Search for a city.../i);
  expect(inputElement).toBeInTheDocument();
});

test('allows typing in search input', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Search for a city.../i);
  // Using fireEvent.change to simulate typing
  fireEvent.change(inputElement, { target: { value: 'Rabat' } });
  expect(inputElement.value).toBe('Rabat');
});
