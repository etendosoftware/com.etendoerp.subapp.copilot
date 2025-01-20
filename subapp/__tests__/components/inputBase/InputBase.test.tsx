// Primero los mocks, antes de cualquier importación
import { StyleSheet, Platform } from 'react-native';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    StyleSheet: {
      ...RN.StyleSheet,
      create: jest.fn((styles) => styles),
    },
    Platform: {
      OS: 'ios',
      select: jest.fn(),
    },
    Pressable: 'Pressable',
    Text: 'Text',
    TextInput: 'TextInput',
    View: 'View',
  };
});

jest.mock('../../../src/helpers/table_utils', () => ({
  cursorPointer: jest.fn(() => ({ cursor: 'pointer' })),
}));

jest.mock('../../../src/components/containers/gridContainer', () => ({
  GridContainer: 'GridContainer',
}));

// Después de los mocks, importamos React y el resto
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputBase from '../../../src/components/inputBase/InputBase';

import { DANGER_700, NEUTRAL_500, PRIMARY_100 } from '../../../src/styles/colors';

describe('InputBase Component', () => {
  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnPress = jest.fn();

  const defaultProps = {
    value: '',
    placeholder: 'Test placeholder',
    onChangeText: mockOnChangeText,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with basic props', () => {
    const { getByPlaceholderText } = render(<InputBase {...defaultProps} />);
    expect(getByPlaceholderText('Test placeholder')).toBeTruthy();
  });

  it('displays title when provided', () => {
    const { UNSAFE_getByType } = render(
      <InputBase {...defaultProps} title="Test Title" />
    );
    const titleText = UNSAFE_getByType('Text');
    expect(titleText.props.children).toBe('Test Title');
  });

  it('displays helper text when provided', () => {
    const { UNSAFE_getAllByType } = render(
      <InputBase {...defaultProps} helperText="Helper text" />
    );
    const texts = UNSAFE_getAllByType('Text');
    const helperText = texts.find(t => t.props.children === 'Helper text');
    expect(helperText).toBeTruthy();
  });

  it('handles text input changes', () => {
    const { UNSAFE_getByType } = render(<InputBase {...defaultProps} />);
    const input = UNSAFE_getByType('TextInput');
    
    fireEvent.changeText(input, 'new value');
    expect(mockOnChangeText).toHaveBeenCalledWith('new value');
  });

  it('validates numeric input correctly', () => {
    const { UNSAFE_getByType } = render(
      <InputBase {...defaultProps} keyboardType="numeric" />
    );
    const input = UNSAFE_getByType('TextInput');

    // Válidos
    fireEvent.changeText(input, '123');
    expect(mockOnChangeText).toHaveBeenCalledWith('123');
    
    fireEvent.changeText(input, '12.34');
    expect(mockOnChangeText).toHaveBeenCalledWith('12.34');

    // No válidos
    fireEvent.changeText(input, 'abc');
    expect(mockOnChangeText).not.toHaveBeenCalledWith('abc');
  });

  it('handles focus state correctly', () => {
    const { UNSAFE_getByType } = render(
      <InputBase {...defaultProps} onFocus={mockOnFocus} />
    );
    const input = UNSAFE_getByType('TextInput');
    
    fireEvent(input, 'focus');
    const container = UNSAFE_getByType('View');
    
    expect(mockOnFocus).toHaveBeenCalled();
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: expect.any(String),
        }),
      ])
    );
  });

  it('handles disabled state', () => {
    const { UNSAFE_getByType } = render(
      <InputBase {...defaultProps} isDisabled={true} />
    );
    const input = UNSAFE_getByType('TextInput');
    expect(input.props.editable).toBe(false);
  });

  it('applies error styles', () => {
    const { UNSAFE_getByType } = render(
      <InputBase {...defaultProps} isError={true} />
    );
    const container = UNSAFE_getByType('View');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: DANGER_700,
        }),
      ])
    );
  });

  it('handles multiline mode', () => {
    const { UNSAFE_getByType } = render(
      <InputBase {...defaultProps} multiline={true} numberOfLines={3} />
    );
    const input = UNSAFE_getByType('TextInput');

    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(3);

    fireEvent(input, 'contentSizeChange', {
      nativeEvent: {
        contentSize: { height: 60 },
      },
    });
  });

  it('handles onPress callback', () => {
    const { UNSAFE_getByType } = render(
      <InputBase {...defaultProps} onPress={mockOnPress} />
    );
    const pressable = UNSAFE_getByType('Pressable');
    
    fireEvent.press(pressable);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('renders right buttons correctly', () => {
    const mockButton = {
      type: jest.fn(({ disabled, typeStyle }) => (
        <Text>{`Button-${disabled}-${typeStyle}`}</Text>
      )),
      props: {},
    };

    const { UNSAFE_getByType } = render(
      <InputBase {...defaultProps} rightButtons={[mockButton]} />
    );

    expect(UNSAFE_getByType('GridContainer')).toBeTruthy();
  });

});