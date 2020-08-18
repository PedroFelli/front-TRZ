import React from 'react';
import { render } from '@testing-library/react';

import Select from '~/components/Select';

describe('SurvivorList', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('should be able to render select component', async () => {
    const { getByText } = render(<Select options={['Pedro', 'Joao']} />);

    expect(getByText('Pedro')).toBeTruthy();
  });
});
