import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from '../../App';

describe('Landing', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('should be able to render page', () => {
    const { container } = render(<App />);

    expect(container.innerHTML).toMatch('What you gonna do:');
  });

  it('should be able to navigate to register page', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('Register'));

    expect(getByText('Resources')).toBeTruthy();
  });

  it('should be able to navigate to survivors list and see loading', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('Back'));
    fireEvent.click(getByText('Check people status'));

    expect(getByText('Loading ...')).toBeTruthy();
  });
});
