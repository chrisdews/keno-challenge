import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Button from './Button';

it('renders correctly', () => {
  const tree = renderer
    .create(<Button />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// test('renders learn react link', () => {
//   render(<Button />);
//   const linkElement = screen.getByText(/1/i);
//   expect(linkElement).toBeInTheDocument();
// });