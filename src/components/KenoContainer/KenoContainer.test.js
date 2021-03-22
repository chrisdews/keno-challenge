import { array } from 'prop-types';
import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import KenoContainer from './KenoContainer';
import Button from '../Button'

const setup = () => {
  const kenoRender = render(<KenoContainer><Button></Button></KenoContainer>)
  const submitButton = kenoRender.getByRole('button', {name: 'Place Bet'})
  const promptNode = kenoRender.getByRole('prompt')
  const firstNumberButton = kenoRender.getByRole('button', {name: '1'})
  const setStakeButton = kenoRender.getByRole('button', {name: '1 💰'})
  const stakeInput = screen.getByLabelText('stake-input')

  return {submitButton, promptNode, firstNumberButton, stakeInput, setStakeButton, ...kenoRender}
}

it('renders Snapshot correctly', () => {
  const tree = renderer
    .create(<KenoContainer />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Click Place Bet before selecting numbers renders prompt to select picks', () => {
  const {submitButton, promptNode} = setup()
  fireEvent.click(submitButton)
  expect(promptNode).toHaveTextContent(/select some numbers/i)
})

test('Click Place Bet before selecting a stake renders prompt to select a stake', () => {
  const {submitButton, promptNode, firstNumberButton} = setup()
  fireEvent.click(firstNumberButton)
  fireEvent.click(submitButton)
  expect(promptNode).toHaveTextContent(/choose a stake/i)
})

test('Click Place Bet after selecting numbers and stake renders win game message', async () => {
  const {submitButton, promptNode, firstNumberButton, setStakeButton} = setup()
  fireEvent.click(firstNumberButton)
  fireEvent.click(setStakeButton)
  fireEvent.click(submitButton)
  expect(promptNode).toHaveTextContent(/you win/i)
})

test('Click Place Bet after inputting stake with more than 2dp renders too many decimals prompt', () => {
  const {submitButton, promptNode, stakeInput} = setup()
  fireEvent.change(stakeInput, {target: {value: '23.456'}})
  fireEvent.click(submitButton)
  expect(promptNode).toHaveTextContent(/too many decimals/i)
})

test('Click Place Bet after inputting stake with less than 3dp and number selected renders win prompt', () => {
  const {firstNumberButton, submitButton, promptNode, stakeInput} = setup()
  fireEvent.click(firstNumberButton)
  fireEvent.change(stakeInput, {target: {value: '23.45'}})
  fireEvent.click(submitButton)
  expect(promptNode).toHaveTextContent(/you win/i)
})

test('There should never be more than 5 numbers selected', () => {
  const kenoRender = render(<KenoContainer><Button></Button></KenoContainer>)

  for (let index = 1; index < 10; index++) {
    const selectedNumber = kenoRender.getByRole('button', {name: `${index}`});
    fireEvent.click(selectedNumber)
  }

  const buttons = kenoRender.getAllByRole('button')
  let activeCount = 0
  buttons.forEach(element => {
    element.className.includes('active min-width-button') && activeCount++
  });
  expect(activeCount).toBeLessThan(6)
})
// this test is a bit weird, how would you do it? background colour doesnt seem to work for me.