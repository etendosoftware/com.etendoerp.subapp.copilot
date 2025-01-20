import React from 'react';
import { render } from '@testing-library/react-native';
import InputHelperText from '../../../../src/components/input/components/InputHelperText';

// Mock de los estilos
jest.mock('../../../../src/components/input/Input.style', () => ({
  styles: {
    rowHelperText: {
      flexDirection: 'row',
      marginTop: 4,
    },
  },
}));

describe('InputHelperText Component', () => {
  const defaultProps = {
    styleHelper: {
      color: '#666666',
      fontSize: 12,
    },
    label: 'Helper Text',
  };

  it('renders correctly with label', () => {
    const { getByText } = render(<InputHelperText {...defaultProps} />);
    
    const helperText = getByText('Helper Text');
    expect(helperText).toBeTruthy();
    expect(helperText.props.style).toEqual(defaultProps.styleHelper);
    expect(helperText.props.numberOfLines).toBe(1);
    expect(helperText.props.ellipsizeMode).toBe('tail');
  });

  it('does not render when label is undefined', () => {
    const { UNSAFE_queryAllByType } = render(
      <InputHelperText styleHelper={defaultProps.styleHelper} label={undefined} />
    );
    
    const viewElements = UNSAFE_queryAllByType('View');
    expect(viewElements).toHaveLength(0);
  });

  it('does not render when label is empty string', () => {
    const { UNSAFE_queryAllByType } = render(
      <InputHelperText styleHelper={defaultProps.styleHelper} label="" />
    );
    
    const viewElements = UNSAFE_queryAllByType('View');
    expect(viewElements).toHaveLength(0);
  });

  it('applies custom styles correctly', () => {
    const customStyle = {
      color: '#FF0000',
      fontSize: 14,
      fontWeight: 'bold',
    };
    
    const { getByText } = render(
      <InputHelperText styleHelper={customStyle} label="Custom Style Text" />
    );
    
    const helperText = getByText('Custom Style Text');
    expect(helperText.props.style).toEqual(customStyle);
  });

  it('renders multiline text correctly', () => {
    const longText = 'This is a very long helper text that should be truncated when it exceeds the available space';
    
    const { getByText } = render(
      <InputHelperText {...defaultProps} label={longText} />
    );
    
    const helperText = getByText(longText);
    expect(helperText).toBeTruthy();
    expect(helperText.props.numberOfLines).toBe(1);
  });
});