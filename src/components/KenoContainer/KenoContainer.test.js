import { array } from 'prop-types';
import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import KenoContainer from './KenoContainer';
import Button from '../Button'



it('renders correctly', () => {
  const tree = renderer
    .create(<KenoContainer />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Click Place Bet before selecting numbers renders prompt to select picks', async () => {
  render(<KenoContainer><Button></Button></KenoContainer>)
  const submitButton = screen.getByRole('button', {name: 'Place Bet'})
  fireEvent.click(submitButton)
  const promptNode = await screen.getByRole('prompt')
  expect(promptNode).toHaveTextContent(/select some numbers/i)
})

test('Click Place Bet before selecting a stake renders prompt to select a stake', async () => {
  render(<KenoContainer><Button></Button></KenoContainer>)
  const firstNumberButton = screen.getByRole('button', {name: '1'})
  fireEvent.click(firstNumberButton)
  const submitButton = await screen.getByRole('button', {name: 'Place Bet'})
  fireEvent.click(submitButton)
  const promptNode = await screen.getByRole('prompt')
  expect(promptNode).toHaveTextContent(/choose a stake/i)
})