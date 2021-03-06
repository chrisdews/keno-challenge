import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';
import { render, screen } from '@testing-library/react'

describe ('Header', ()=>{
    it('renders correctly - snapshot', () => {
        const tree = renderer
          .create(<Header><p>Keno</p></Header>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

    test('renders Children', () => {
        render(<Header><p>Keno</p></Header>)
        expect(screen.getByText('Keno'))
    })
})

