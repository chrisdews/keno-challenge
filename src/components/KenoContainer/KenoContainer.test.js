import { array } from 'prop-types';
import React from 'react';
import renderer from 'react-test-renderer';
import KenoContainer from './KenoContainer';


it('renders correctly', () => {
  const tree = renderer
    .create(<KenoContainer />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// test('counter increments the count', () => {
//     const container = renderer.create(<KenoContainer />).toJSON()
//     const button = container[2].children
//     console.log(button)
//     // expect(button.textContent).toBe('0')
//     // fireEvent.click(button)
//     // expect(button.textContent).toBe('1')
//   })