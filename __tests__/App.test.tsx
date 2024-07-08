import React from 'react';
import App from '../src/App';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {waitFor} from '@testing-library/react-native';

jest.mock('../src/navigation/AppNavigator', () => {
  return {
    __esModule: true,
    default: () => <></>,
  };
});

describe('App', () => {
  it('should render the App component', async () => {
    await waitFor(() => {
      renderer.create(<App />);
    });
  });
});
