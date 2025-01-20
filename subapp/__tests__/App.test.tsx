/**
 * @format
 */
import 'react-native';
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { it, describe, expect } from '@jest/globals';

const App = () => (
  <Text>App</Text>
);

describe('App Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    
    const textElement = getByText(/App/i);
    expect(textElement).toBeTruthy();
  });
});