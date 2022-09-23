import {render, screen} from "@testing-library/react";
import TopMenuBar from "./TopMenuBar";


test('renders the top menu bar', () => {
    render(<TopMenuBar/>);
    expect(screen.getByRole('heading', {name: 'Trello-Clone'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign Out'})).toBeInTheDocument();
})
