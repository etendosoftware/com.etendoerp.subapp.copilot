import React from 'react';
import { render } from '@testing-library/react-native';
import { Animated, Text } from 'react-native';
import { AnimatedMessage } from "../../../src/components/animated-message/AnimatedMessage";

// Suprimir warnings específicos de act()
const originalError = console.error;
beforeAll(() => {

  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock the Animated.timing function
jest.mock('react-native/Libraries/Animated/Animated', () => {
  const ActualAnimated = jest.requireActual('react-native/Libraries/Animated/Animated');
  return {
    ...ActualAnimated,
    timing: jest.fn(() => ({
      start: jest.fn(callback => callback && callback()),
    })),
    Value: jest.fn(() => ({
      setValue: jest.fn(),
      interpolate: jest.fn(),
    })),
  };
});

describe('AnimatedMessage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test Message';
    const { getByText } = render(
      <AnimatedMessage>
        <Text>{testMessage}</Text>
      </AnimatedMessage>
    );
  
    expect(getByText(testMessage)).toBeTruthy();
  });

  it('applies correct style transformations', () => {
    const { UNSAFE_getByType } = render(
      <AnimatedMessage>
        <Text>Test</Text>
      </AnimatedMessage>
    );

    const animatedView = UNSAFE_getByType(Animated.View);
    expect(animatedView.props.style).toEqual({
      transform: [{ translateY: expect.any(Object) }],
      opacity: expect.any(Object),
    });
  });
});