import React from 'react';
import { render } from '@testing-library/react-native';
import TextMessage from '../../../src/components/text-message/TextMessage';
import {
  DANGER_700,
  DANGER_900,
  NEUTRAL_1000,
} from '../../../src/styles/colors';

// Mock the etendo-ui-library components
jest.mock('etendo-ui-library', () => ({
  FileIcon: 'FileIcon',
  XCircleFillIcon: 'XCircleFillIcon',
}));

describe('TextMessage Component', () => {
  const defaultProps = {
    text: 'Hello World',
    time: '10:30',
    type: 'left-user' as const,
  };

  it('renders basic message correctly', () => {
    const { getByText } = render(<TextMessage {...defaultProps} />);
    const timeElement = getByText('10:30');
    expect(timeElement).toBeTruthy();
  });

  it('renders title when provided', () => {
    const props = {
      ...defaultProps,
      title: 'Message Title',
    };
    const { getByText } = render(<TextMessage {...props} />);
    const titleElement = getByText('Message Title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: NEUTRAL_1000,
        }),
      ])
    );
  });

  it('renders file information when provided', () => {
    const props = {
      ...defaultProps,
      file: 'document.pdf',
    };
    const { getByText, UNSAFE_getByType } = render(<TextMessage {...props} />);
    
    const fileElement = getByText('document.pdf');
    expect(fileElement).toBeTruthy();
    expect(UNSAFE_getByType('FileIcon')).toBeTruthy();
  });

  it('applies correct styling for error type messages', () => {
    const props = {
      ...defaultProps,
      type: 'error' as const,
      title: 'Error Message',
    };
    const { getByText, UNSAFE_getByType } = render(<TextMessage {...props} />);
    
    const titleElement = getByText('Error Message');
    expect(titleElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: DANGER_900,
        }),
      ])
    );
    
    const errorIcon = UNSAFE_getByType('XCircleFillIcon');
    expect(errorIcon).toBeTruthy();
    expect(errorIcon.props.fill).toBe(DANGER_700);
  });

  it('applies custom background color when provided', () => {
    const customColor = '#FF0000';
    const props = {
      ...defaultProps,
      backgroundColor: customColor,
    };
    const { UNSAFE_root } = render(<TextMessage {...props} />);
    
    const messageContainer = UNSAFE_root.children[0];
    expect(messageContainer.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: customColor,
      })
    );
  });

  it('handles message without timestamp', () => {
    const props = {
      ...defaultProps,
      time: undefined,
    };
    const { queryByText } = render(<TextMessage {...props} />);
    expect(queryByText('10:30')).toBeNull();
  });

  it('applies correct border radius based on message type', () => {
    const types = ['left-user', 'right-user', 'error'] as const;
    
    types.forEach((type) => {
      const props = {
        ...defaultProps,
        type,
      };
      const { UNSAFE_root } = render(<TextMessage {...props} />);
      
      const messageContainer = UNSAFE_root.children[0];
      const styles = messageContainer.props.style;
      
      if (type === 'right-user') {
        expect(styles).toContainEqual(
          expect.objectContaining({
            borderTopRightRadius: 0,
          })
        );
      } else {
        expect(styles).toContainEqual(
          expect.objectContaining({
            borderTopLeftRadius: 0,
          })
        );
      }
    });
  });

  it('truncates long file names', () => {
    const props = {
      ...defaultProps,
      file: 'very-long-file-name-that-should-be-truncated.pdf',
    };
    const { getByText } = render(<TextMessage {...props} />);
    
    const fileElement = getByText('very-long-file-name-that-should-be-truncated.pdf');
    expect(fileElement.props.numberOfLines).toBe(1);
    expect(fileElement.props.ellipsizeMode).toBe('tail');
  });

  it('renders multiple optional props together correctly', () => {
    const props = {
      ...defaultProps,
      title: 'Complete Message',
      file: 'document.pdf',
      type: 'error' as const,
    };
    const { getByText, UNSAFE_getByType } = render(<TextMessage {...props} />);
    
    expect(getByText('Complete Message')).toBeTruthy();
    expect(getByText('document.pdf')).toBeTruthy();
    expect(getByText('10:30')).toBeTruthy();
    expect(UNSAFE_getByType('XCircleFillIcon')).toBeTruthy();
    expect(UNSAFE_getByType('FileIcon')).toBeTruthy();
  });
});
