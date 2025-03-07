/**
 * @format
 */
import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { App } from '../App';
import { Global } from '../lib/GlobalConfig';
import locale from '../src/localization/locale';
import { createStackNavigator } from '@react-navigation/stack';

// Mock dependencies
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn().mockReturnValue({
    Navigator: ({ children }) => children,
    Screen: ({ children, ...props }) => children(props)
  })
}));

jest.mock('../src/screens/home', () => ({
  __esModule: true,
  default: ({ navigationContainer, sharedFiles }) => null
}));

jest.mock('../src/localization/locale', () => ({
  __esModule: true,
  default: {
    init: jest.fn(),
    setCurrentLanguage: jest.fn(),
    formatLanguageUnderscore: jest.fn(lang => `${lang}_FORMATTED`)
  }
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({ children }) => children
}));

describe('App Component', () => {
  const mockProps = {
    language: 'en',
    dataUser: {
      id: '1',
      name: 'Test User'
    },
    navigationContainer: {
      ref: { current: null },
      onStateChange: jest.fn()
    },
    token: 'test-token',
    url: 'http://test.com',
    contextPathUrl: '/api',
    sharedFiles: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize locale with correct language', () => {
    render(<App {...mockProps} />);

    expect(locale.init).toHaveBeenCalled();
    expect(locale.formatLanguageUnderscore).toHaveBeenCalledWith(mockProps.language);
    expect(locale.setCurrentLanguage).toHaveBeenCalledWith(`${mockProps.language}_FORMATTED`);
  });

  it('should set Global configuration correctly', () => {
    render(<App {...mockProps} />);

    expect(Global.url).toBe(mockProps.url);
    expect(Global.token).toBe(mockProps.token);
    expect(Global.contextPathUrl).toBe(mockProps.contextPathUrl);
  });

  it('should pass correct props to Home screen', () => {
    const Stack = createStackNavigator();
    
    jest.spyOn(Stack, 'Screen');

    render(<App {...mockProps} />);

    const screenRender = (Stack.Screen as jest.Mock).mock.calls[0][0];
    expect(screenRender.name).toBe('Home');
    expect(screenRender.options).toEqual({ headerShown: false });
    expect(screenRender.initialParams).toEqual({ dataUser: mockProps.dataUser });
  });

  it('should handle undefined sharedFiles', () => {
    const propsWithoutSharedFiles = {
      ...mockProps,
      sharedFiles: undefined
    };

    expect(() => {
      render(<App {...propsWithoutSharedFiles} />);
    }).not.toThrow();
  });

  it('should handle empty navigationContainer', () => {
    const propsWithEmptyNav = {
      ...mockProps,
      navigationContainer: {
        ref: { current: null },
        onStateChange: undefined
      }
    };

    expect(() => {
      render(<App {...propsWithEmptyNav} />);
    }).not.toThrow();
  });
});