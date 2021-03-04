import React from 'react';
import renderer from 'react-test-renderer';
import KenoContainer from './KenoContainer';

it('renders correctly', () => {
  const tree = renderer
    .create(<KenoContainer />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});