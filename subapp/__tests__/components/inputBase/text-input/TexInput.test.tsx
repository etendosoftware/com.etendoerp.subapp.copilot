import React from 'react';
import { render } from '@testing-library/react-native';
import { DANGER_600, NEUTRAL_500, SUCCESS_600 } from '../../../../src/styles/colors';

jest.mock('react-native', () => ({
  View: 'View',
  StyleSheet: {
    create: jest.fn((obj) => obj)
  }
}));

jest.mock('../../../../src/components/inputBase/InputBase', () => 'InputBase');

jest.mock('etendo-ui-library', () => ({
  CheckCircleFillIcon: 'CheckCircleFillIcon',
  XCircleFillIcon: 'XCircleFillIcon'
}));

jest.mock('../../../../src/components/inputBase/text-input/TextInput.style', () => ({
  styles: {
    icon: { height: 24, width: 24 },
    iconContainer: { paddingHorizontal: 8 }
  }
}));

import TextInput from '../../../../src/components/inputBase/text-input/TextInput';

describe('TextInput Component', () => {
  const defaultProps = {
    value: '',
    onChangeText: jest.fn(),
    placeholder: 'Enter text'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { UNSAFE_getByType } = render(<TextInput {...defaultProps} />);
    expect(UNSAFE_getByType('InputBase')).toBeTruthy();
  });

  it('passes validation props correctly when validation is success', () => {
    const { UNSAFE_getByType } = render(
      <TextInput {...defaultProps} validation="success" />
    );
    
    const inputBase = UNSAFE_getByType('InputBase');
    expect(inputBase.props.rightButtons).toBeDefined();
    expect(inputBase.props.rightButtons[0].type).toBe('View');
    expect(inputBase.props.rightButtons[0].props.children.type).toBe('CheckCircleFillIcon');
    expect(inputBase.props.rightButtons[0].props.children.props.fill).toBe(SUCCESS_600);
  });

  it('passes validation props correctly when validation is error', () => {
    const { UNSAFE_getByType } = render(
      <TextInput {...defaultProps} validation="error" />
    );
    
    const inputBase = UNSAFE_getByType('InputBase');
    expect(inputBase.props.rightButtons).toBeDefined();
    expect(inputBase.props.rightButtons[0].type).toBe('View');
    expect(inputBase.props.rightButtons[0].props.children.type).toBe('XCircleFillIcon');
    expect(inputBase.props.rightButtons[0].props.children.props.fill).toBe(DANGER_600);
  });

  it('passes correct icon color when disabled', () => {
    const { UNSAFE_getByType } = render(
      <TextInput {...defaultProps} validation="success" isDisabled={true} />
    );
    
    const inputBase = UNSAFE_getByType('InputBase');
    expect(inputBase.props.rightButtons[0].props.children.props.fill).toBe(NEUTRAL_500);
  });

  it('passes custom right buttons correctly', () => {
    const CustomButton = () => <View testID="custom-button" />;
    const { UNSAFE_getByType } = render(
      <TextInput {...defaultProps} rightButtons={[<CustomButton key="custom" />]} />
    );
    
    const inputBase = UNSAFE_getByType('InputBase');
    expect(inputBase.props.rightButtons).toHaveLength(1);
  });

  it('combines validation icon and custom right buttons', () => {
    const CustomButton = () => <View testID="custom-button" />;
    const { UNSAFE_getByType } = render(
      <TextInput 
        {...defaultProps} 
        validation="success" 
        rightButtons={[<CustomButton key="custom" />]} 
      />
    );
    
    const inputBase = UNSAFE_getByType('InputBase');
    expect(inputBase.props.rightButtons).toHaveLength(2);
  });

  it('passes through additional props to InputBase', () => {
    const additionalProps = {
      maxLength: 10,
      autoCapitalize: 'none' as const,
    };

    const { UNSAFE_getByType } = render(
      <TextInput {...defaultProps} {...additionalProps} />
    );

    const inputBase = UNSAFE_getByType('InputBase');
    expect(inputBase.props.maxLength).toBe(10);
    expect(inputBase.props.autoCapitalize).toBe('none');
  });

  it('handles validation none state correctly', () => {
    const { UNSAFE_getByType } = render(
      <TextInput {...defaultProps} validation="none" />
    );
    
    const inputBase = UNSAFE_getByType('InputBase');
    expect(inputBase.props.rightButtons).toBeUndefined();
  });

  it('handles undefined rightButtons gracefully', () => {
    const { UNSAFE_getByType } = render(
      <TextInput {...defaultProps} validation="success" rightButtons={undefined} />
    );
    
    const inputBase = UNSAFE_getByType('InputBase');
    expect(inputBase.props.rightButtons).toBeDefined();
    expect(inputBase.props.rightButtons[0].props.children.type).toBe('CheckCircleFillIcon');
  });
});