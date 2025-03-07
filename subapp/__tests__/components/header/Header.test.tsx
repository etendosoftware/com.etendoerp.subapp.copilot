import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Image } from 'react-native';
import Header from '../../../src/components/header/Header';
import locale from '../../../src/localization/locale';
import theme from '../../../src/styles/theme';

const RN = require('react-native');

jest.mock('etendo-ui-library', () => {
  const React = require('react');
  const RN = require('react-native');
  return {
    Button: (props) => React.createElement(RN.Pressable, {
      testID: 'button-container',
      onPress: props.onPress,
      typeStyle: props.typeStyle
    }, [
      React.createElement(RN.View, { 
        testID: 'button-icon',
        key: 'icon' 
      }, props.iconLeft),
      React.createElement(RN.Text, { 
        testID: 'button-text',
        key: 'text' 
      }, props.text)
    ]),
    ArrowLeftIcon: (props) => React.createElement(RN.View, {
      testID: 'arrow-left-icon',
      style: { fill: props.fill }
    })
  };
});

jest.mock('../../../src/localization/locale', () => ({
  t: jest.fn((key: string) => {
    const translations: { [key: string]: string } = {
      'Home.copilot': 'Copilot',
      'Home.back': 'Back'
    };
    return translations[key] || key;
  }),
  locale: 'en-US'
}));

jest.mock('../../../src/assets/images/copilot/copilot.png', () => 'mocked-copilot-image');

describe('Header Component', () => {
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();
  const defaultProps = {
    navigationContainer: {
      navigate: mockNavigate,
      goBack: mockGoBack
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all elements', () => {
    const { getByText, getByTestId, UNSAFE_getByType } = render(<Header {...defaultProps} />);
    
    expect(getByTestId('button-container')).toBeTruthy();
    
    const titleText = getByText('Copilot');
    expect(titleText).toBeTruthy();
    
    const image = UNSAFE_getByType(Image);
    expect(image.props.source.uri).toBe('mocked-copilot-image');
    
    const arrowIcon = getByTestId('arrow-left-icon');
    expect(arrowIcon).toBeTruthy();
    expect(arrowIcon.props.style.fill).toBe(theme.colors.palette.dynamicColor.dark);
  });

  it('handles navigation correctly when back button is pressed', () => {
    const { getByTestId } = render(<Header {...defaultProps} />);
    
    const backButton = getByTestId('button-container');
    fireEvent.press(backButton);
    
    expect(mockGoBack).toHaveBeenCalled();
    expect(mockGoBack).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('uses correct translations', () => {
    render(<Header {...defaultProps} />);
    
    expect(locale.t).toHaveBeenCalledWith('Home.copilot');
    expect(locale.t).toHaveBeenCalledWith('Home.back');
  });

  it('applies correct styles', () => {
    const { UNSAFE_getByType, getByTestId } = render(<Header {...defaultProps} />);
    
    const image = UNSAFE_getByType(Image);
    expect(image.props.style).toBeTruthy();

    const button = getByTestId('button-container');
    expect(button.props.typeStyle).toBe('terciary');
  });
});