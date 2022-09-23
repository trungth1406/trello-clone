import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';


describe('App', () => {
    render(<App/>);

    it('renders the top menu bar', () => {
        expect(screen.getByRole('heading', {name: 'Trello-Clone'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Sign Out'})).toBeInTheDocument();
    });




});
