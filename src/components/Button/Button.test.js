import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';


it('renders correctly', () => {
  const tree = renderer
    .create(<Button />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// describe('Button tests', () => {
//   test('Button calls clickHandler when clicked', () => {
//         const handleClick = jest.fn()
//         render(<Button onClick={handleClick}>click me</Button>)
//         fireEvent.click(screen.getByText(/click me/i))
//         expect(handleClick).toHaveBeenCalledTimes(1)
//   })


// })