import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputField from '../../../../src/components/input/components/InputField';
import { InputFieldVariant } from '../../../../src/components/input/Input.types';

// Mock de los estilos
jest.mock('../../../../src/components/input/Input.style', () => ({
  styles: {
    inputImageSize: {},
    buttonContainerInputField: {},
    spaceInOptionsAndInput: { height: 5 },
    optionFilterContainer: { height: 40 },
    optionContainer: { height: 40, marginTop: 4 },
    optionsContainer: { borderWidth: 1 },
    offSet: { height: 10 },
  },
}));

// Mock de las utilidades
jest.mock('../../../../src/helpers/table_utils', () => ({
  disableOutline: jest.fn(() => ({})),
}));

// Mock de los colores
jest.mock('../../../../src/styles/colors', () => ({
  NEUTRAL_0: '#FFFFFF',
  NEUTRAL_400: '#9CA3AF',
  NEUTRAL_600: '#4B5563',
}));

// Mock del componente InputOptions
jest.mock('../../../../src/components/input/components/InputOptions', () => 'InputOptions');

// Mock de etendo-ui-library
jest.mock('etendo-ui-library', () => ({
  SearchIcon: 'SearchIcon',
  XIcon: 'XIcon',
}));

// Mock de react-native
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn(obj => obj.ios),
  },
  StyleSheet: {
    create: jest.fn(styles => styles),
    flatten: jest.fn(style => style),
  },
  Dimensions: {
    get: jest.fn(() => ({
      width: 400,
      height: 800,
      scale: 1,
      fontScale: 1,
      window: { width: 400, height: 800 },
      screen: { width: 400, height: 800 }
    }))
  },
  View: 'View',
  Text: 'Text',
  TextInput: 'TextInput',
  TouchableOpacity: 'TouchableOpacity',
  Modal: 'Modal',
  Pressable: 'Pressable',
  ScrollView: 'ScrollView',
  ActivityIndicator: 'ActivityIndicator',
}));

const originalConsoleWarn = console.warn;
describe('InputField Component', () => {
  beforeAll(() => {
    console.warn = (...args) => {
      if (args[0] && typeof args[0] === 'string' && 
          (args[0].includes('ProgressBarAndroid') || 
           args[0].includes('Clipboard') ||
           args[0].includes('NativeEventEmitter') ||
           args[0].includes('PushNotificationIOS'))) {
        return;
      }
      originalConsoleWarn.apply(console, args);
    };
  });

  afterAll(() => {
    console.warn = originalConsoleWarn;
  });

  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnPress = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockOnOptionSelected = jest.fn();

  const defaultProps = {
    type: InputFieldVariant.TextInput,
    configField: {
      type: InputFieldVariant.TextInput,
      disabledField: false,
      disabledSubmit: false,
    },
    styleField: {
      field: {},
      focus: {},
      textDefault: {},
      textPlaceholder: {},
    },
    value: '',
    placeholder: 'Enter text',
    onChangeText: mockOnChangeText,
    onFocus: mockOnFocus,
    onBlur: mockOnBlur,
    onPress: mockOnPress,
    onSubmit: mockOnSubmit,
    onOptionSelected: mockOnOptionSelected,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly as text input', () => {
    const { getByPlaceholderText } = render(<InputField {...defaultProps} />);
    const input = getByPlaceholderText('Enter text');
    expect(input).toBeTruthy();
    expect(input.props.editable).toBe(true);
  });

  it('handles text input changes', () => {
    const { getByPlaceholderText } = render(<InputField {...defaultProps} />);
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'test value');
    expect(mockOnChangeText).toHaveBeenCalledWith('test value');
  });

  it('handles focus and blur events', () => {
    const { getByPlaceholderText } = render(<InputField {...defaultProps} />);
    const input = getByPlaceholderText('Enter text');
    
    fireEvent(input, 'focus');
    expect(mockOnFocus).toHaveBeenCalled();
    
    fireEvent(input, 'blur');
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('handles number input correctly', () => {
    const props = {
      ...defaultProps,
      keyboardType: 'number',
    };

    const { getByPlaceholderText } = render(<InputField {...props} />);
    const input = getByPlaceholderText('Enter text');
    
    fireEvent.changeText(input, '123');
    expect(mockOnChangeText).toHaveBeenCalledWith('123');
    
    fireEvent.changeText(input, 'abc');
    expect(mockOnChangeText).not.toHaveBeenCalledWith('abc');
  });

  it('handles disabled state correctly', () => {
    const props = {
      ...defaultProps,
      disabled: true,
      configField: {
        ...defaultProps.configField,
        disabledField: true,
      },
    };

    const { getByPlaceholderText } = render(<InputField {...props} />);
    const input = getByPlaceholderText('Enter text');
    expect(input.props.editable).toBeFalsy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = {
      field: { backgroundColor: 'red' },
      focus: { borderColor: 'blue' },
      textDefault: { color: 'green' },
    };

    const props = {
      ...defaultProps,
      styleField: customStyle,
    };

    const { getByPlaceholderText } = render(<InputField {...props} />);
    const input = getByPlaceholderText('Enter text');
    expect(input.props.style).toContainEqual(customStyle.textDefault);
  });

  it('renders text display mode correctly', () => {
    const props = {
      ...defaultProps,
      configField: {
        ...defaultProps.configField,
        type: 'text',
      },
      value: 'Display Text',
    };

    const { getByText } = render(<InputField {...props} />);
    const textElement = getByText('Display Text');
    expect(textElement).toBeTruthy();
    expect(textElement.props.numberOfLines).toBe(1);
    expect(textElement.props.ellipsizeMode).toBe('tail');
  });

  it('handles picker type correctly', () => {
    const props = {
      ...defaultProps,
      type: InputFieldVariant.Picker,
      configField: {
        ...defaultProps.configField,
        type: InputFieldVariant.Picker,
      },
      dataPicker: [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
      ],
    };

    const { UNSAFE_getAllByType } = render(<InputField {...props} />);
    const options = UNSAFE_getAllByType('InputOptions');
    expect(options).toHaveLength(1);
  });

  it('handles max length correctly', () => {
    const props = {
      ...defaultProps,
      maxLength: 5,
    };

    const { getByPlaceholderText } = render(<InputField {...props} />);
    const input = getByPlaceholderText('Enter text');
    expect(input.props.maxLength).toBe(5);
  });
});