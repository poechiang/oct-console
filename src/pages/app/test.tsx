import App from '@pages/app/index';
import { render, screen } from '@testing-library/react';
import React from 'react';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
