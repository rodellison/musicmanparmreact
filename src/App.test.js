import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App location={{ hash: '#id_token=123&expires_in=3600&type_token=Bearer' }}/>);
  const linkElement = getByText(/Alexa MusicMan - Parm fixer/i);
  expect(linkElement).toBeInTheDocument();
});
