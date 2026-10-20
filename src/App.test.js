import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero heading', () => {
  render(<App />);
  const heading = screen.getByText(/Hello, I'm Ashutosh Gaikwad/i);
  expect(heading).toBeInTheDocument();
});

test('project preview image matches its video', () => {
  render(<App />);
  const preview = screen.getByAltText('Project Task Management System');
  expect(preview.src).toContain('FAxay2A9tCs');
});
