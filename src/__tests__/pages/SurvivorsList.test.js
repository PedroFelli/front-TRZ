import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('SurvivorList', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('should be able to list', async () => {
    const { getByText, getAllByTitle } = render(<App />);

    apiMock.onGet('/survivors').reply(200, [
      {
        id: '5bd1e912-420d-45c1-aec3-ba173cb76257',
        name: 'Pedro Fellipe',
        age: 24,
        gender: '1',
        lonlat: 'POINT (-12.34321,16.879)',
        infected: false,
        createdAt: '2020-08-17T12:15:13.831Z',
        updatedAt: '2020-08-17T12:15:13.831Z',
      },
    ]);

    await api.get('/survivors').then(function (response) {
      console.log(response.data);
    });

    await fireEvent.click(getByText('Check people status'));

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    await sleep(4000);

    expect(getAllByTitle('Pedro Fellipe')).toBeTruthy();
  });
});
