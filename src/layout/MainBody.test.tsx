import {render, screen} from "@testing-library/react";
import MainBody from "./MainBody";

test('renders the main body with children', () => {
    render(<MainBody>Test</MainBody>);
    expect(screen.getByText('Test')).toBeInTheDocument();

});
