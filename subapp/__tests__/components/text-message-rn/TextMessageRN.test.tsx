import React from 'react';
import { render } from '@testing-library/react-native';
import TextMessageRN from '../../../src/components/text-message-rn/TextMessageRN';
import { DANGER_100, NEUTRAL_0, NEUTRAL_200 } from '../../../src/styles/colors';
import { styles } from '../../../src/components/text-message-rn/TextMessageRN.styles';

jest.mock('etendo-ui-library', () => ({
  FileIcon: () => null,
  XCircleFillIcon: () => null
}));

jest.mock('../../../src/components/text-message-rn/MarkdownUtilsRN', () => ({
  RenderMarkdownText: jest.fn().mockImplementation(({ text }) => null)
}));

describe('TextMessageRN Component', () => {
  const defaultProps = {
    text: 'Test message',
    time: '10:00',
    type: 'left-user' as const,
  };

  describe('Basic Rendering', () => {
    it('renders basic message correctly', () => {
      const { getByText } = render(<TextMessageRN {...defaultProps} />);
      expect(getByText('10:00')).toBeTruthy();
    });

    it('renders title when provided', () => {
      const { getByText } = render(
        <TextMessageRN {...defaultProps} title="Message Title" />
      );
      expect(getByText('Message Title')).toBeTruthy();
    });

    it('does not render title when not provided', () => {
      const { queryByText } = render(<TextMessageRN {...defaultProps} />);
      const titleElement = queryByText(/^(?!Test message|10:00).*$/);
      expect(titleElement).toBeNull();
    });
  });

  describe('Message Types', () => {
    it('renders error message with correct styling', () => {
      const { UNSAFE_root } = render(
        <TextMessageRN {...defaultProps} type="error" />
      );
      
      const messageContainer = UNSAFE_root.children[0];
      const styles = messageContainer.props.style;
      
      const hasErrorStyle = styles.some(style => 
        style && style.backgroundColor === DANGER_100
      );
      expect(hasErrorStyle).toBe(true);
    });

    it('renders right-user message with correct styling', () => {
      const { UNSAFE_root } = render(
        <TextMessageRN {...defaultProps} type="right-user" />
      );
      
      const messageContainer = UNSAFE_root.children[0];
      const styles = messageContainer.props.style;
      
      const hasRightUserStyle = styles.some(style => 
        style && style.backgroundColor === NEUTRAL_200
      );
      const hasAlignSelfEnd = styles.some(style => 
        style && style.alignSelf === 'flex-end'
      );
      
      expect(hasRightUserStyle).toBe(true);
      expect(hasAlignSelfEnd).toBe(true);
    });

    it('renders left-user message with correct styling', () => {
      const { UNSAFE_root } = render(
        <TextMessageRN {...defaultProps} type="left-user" />
      );
      
      const messageContainer = UNSAFE_root.children[0];
      const styles = messageContainer.props.style;
      
      const hasLeftUserStyle = styles.some(style => 
        style && style.backgroundColor === NEUTRAL_0
      );
      const hasAlignSelfStart = styles.some(style => 
        style && style.alignSelf === 'flex-start'
      );
      
      expect(hasLeftUserStyle).toBe(true);
      expect(hasAlignSelfStart).toBe(true);
    });
  });

  describe('File Handling', () => {
    const singleFile = [{ name: 'test.pdf' }];
    const multipleFiles = [
      { name: 'test1.pdf' },
      { name: 'test2.pdf' }
    ];

    it('renders single file correctly', () => {
      const { getByText } = render(
        <TextMessageRN {...defaultProps} files={singleFile} />
      );
      expect(getByText('test.pdf')).toBeTruthy();
    });

    it('renders multiple files with correct count', () => {
      const { getByText } = render(
        <TextMessageRN {...defaultProps} files={multipleFiles} />
      );
      expect(getByText('There are 2 uploaded')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
    });

    it('does not render file section when files prop is empty', () => {
      const { queryByText } = render(
        <TextMessageRN {...defaultProps} files={[]} />
      );
      expect(queryByText('uploaded')).toBeNull();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom background color when provided', () => {
      const customColor = '#FF0000';
      const { UNSAFE_root } = render(
        <TextMessageRN {...defaultProps} backgroundColor={customColor} />
      );
      
      const messageContainer = UNSAFE_root.children[0];
      const styles = messageContainer.props.style;
      
      const hasCustomColor = styles.some(style => 
        style && style.backgroundColor === customColor
      );
      expect(hasCustomColor).toBe(true);
    });
  });

  describe('Time Display', () => {
    it('renders time when provided', () => {
      const { getByText } = render(
        <TextMessageRN {...defaultProps} time="12:34" />
      );
      expect(getByText('12:34')).toBeTruthy();
    });

    it('does not render time when not provided', () => {
      const { queryByText } = render(
        <TextMessageRN {...defaultProps} time={undefined} />
      );
      expect(queryByText('12:34')).toBeNull();
    });
  });

  describe('Error Icon', () => {
    it('renders error icon for error type messages', () => {
      const { UNSAFE_root } = render(
        <TextMessageRN {...defaultProps} type="error" />
      );

      const errorContainer = UNSAFE_root.findAll(
        node => node.props?.style === styles.errorIconContainer
      );

      expect(errorContainer.length).toBeGreaterThan(0);
    });

    it('does not render error icon for non-error messages', () => {
      const { UNSAFE_root } = render(
        <TextMessageRN {...defaultProps} type="left-user" />
      );
      
      const errorIconContainer = UNSAFE_root.findAll(
        node => node.props && 
          node.props.style && 
          Array.isArray(node.props.style) && 
          node.props.style.some(style => style === styles.errorIconContainer)
      );
      
      expect(errorIconContainer.length).toBe(0);
    });
  });
});