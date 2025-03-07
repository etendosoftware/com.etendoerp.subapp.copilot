import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import InputTitle from '../../../../src/components/input/components/InputTitle';
import { NEUTRAL_400, PRIMARY_100 } from '../../../../src/styles/colors';

jest.mock('../../../../src/components/input/Input.style', () => ({
  styles: {
    rowInputTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    rowInputTitleImg: {
      width: 16,
      height: 16,
      marginRight: 4,
    },
  },
}));

const MockImage = ({ fill }) => (
  <View testID="mock-image" fill={fill} />
);

describe('InputTitle Component', () => {
  const defaultProps = {
    titleLabel: 'Test Title',
    styleTitle: {
      color: '#000000',
      fontSize: 14,
    },
  };

  it('renders correctly with only title label', () => {
    const { getByText } = render(<InputTitle {...defaultProps} />);
    
    const titleElement = getByText('Test Title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.props.style).toEqual(defaultProps.styleTitle);
    expect(titleElement.props.numberOfLines).toBe(1);
    expect(titleElement.props.ellipsizeMode).toBe('tail');
  });

  it('renders correctly with title and image', () => {
    const props = {
      ...defaultProps,
      titleImage: <MockImage fill={PRIMARY_100} />,
    };

    const { getByText, getByTestId } = render(<InputTitle {...props} />);
    
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByTestId('mock-image')).toBeTruthy();
  });

  it('renders nothing when no title and no image provided', () => {
    const { UNSAFE_root } = render(<InputTitle />);
    expect(UNSAFE_root.children.length).toBe(0);
  });

  it('applies disabled styles to image when disabled prop is true', () => {
    const props = {
      titleLabel: 'Test Title',
      titleImage: <MockImage fill={NEUTRAL_400} />,
      disabled: true,
    };

    const { getByTestId } = render(<InputTitle {...props} />);
    const image = getByTestId('mock-image');
    expect(image.props.fill).toBe(NEUTRAL_400);
  });

  it('applies enabled styles to image when disabled prop is false', () => {
    const props = {
      titleLabel: 'Test Title',
      titleImage: <MockImage fill={PRIMARY_100} />,
      disabled: false,
    };

    const { getByTestId } = render(<InputTitle {...props} />);
    const image = getByTestId('mock-image');
    expect(image.props.fill).toBe(PRIMARY_100);
  });

  it('handles long text with ellipsis', () => {
    const props = {
      ...defaultProps,
      titleLabel: 'This is a very long title that should be truncated with ellipsis',
    };

    const { getByText } = render(<InputTitle {...props} />);
    const titleElement = getByText(props.titleLabel);
    
    expect(titleElement.props.numberOfLines).toBe(1);
    expect(titleElement.props.ellipsizeMode).toBe('tail');
  });

  it('renders with custom title styles', () => {
    const customStyle = {
      color: '#FF0000',
      fontSize: 16,
      fontWeight: 'bold',
    };

    const props = {
      ...defaultProps,
      styleTitle: customStyle,
    };

    const { getByText } = render(<InputTitle {...props} />);
    const titleElement = getByText(props.titleLabel);
    expect(titleElement.props.style).toEqual(customStyle);
  });

  it('renders only image when no title label provided', () => {
    const props = {
      titleImage: <MockImage fill={PRIMARY_100} />,
      styleTitle: defaultProps.styleTitle,
    };

    const { getByTestId, queryByText } = render(<InputTitle {...props} />);
    expect(getByTestId('mock-image')).toBeTruthy();
    expect(queryByText('Test Title')).toBeNull();
  });
});