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

// test('Button', () => {
//         const container = renderer.create(<Button />).toJSON()
//         const title = container
//         console.log(title)
//         // expect(button.textContent).toBe('0')
//         // fireEvent.click(button)
//         // expect(button.textContent).toBe('1')
//       })

