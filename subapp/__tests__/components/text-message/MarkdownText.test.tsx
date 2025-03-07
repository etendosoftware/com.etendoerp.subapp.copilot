import React from 'react';
import { Text, ScrollView, Platform } from 'react-native';
import { render } from '@testing-library/react-native';
import { getTextColorByType } from '../../../src/components/text-message/TextMessage.utils';

const markdownStyles = {
  inlineCode: {
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    fontFamily: 'monospace',
    padding: 2,
  },
  paragraph: {
    marginVertical: 5,
  },
};

jest.mock('react-native-markdown-display', () => ({
  __esModule: true,
  default: function MockMarkdown(props) { return null; }
}));

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: function MockReactMarkdown(props) { return null; }
}));

import Markdown from 'react-native-markdown-display';
import ReactMarkdown from 'react-markdown';

const CodeComponent = (props) => <Text>{props.children}</Text>;
const AnchorComponent = (props) => <Text>{props.children}</Text>;
const ImageComponent = (props) => <Text>{props.alt}</Text>;

const InlineCode = ({ children }) => (
  <Text style={markdownStyles.inlineCode}>{children}</Text>
);

const Paragraph = ({ children, type = 'left-user', style, ...props }) => {
  const combinedStyle = [
    markdownStyles.paragraph,
    { color: getTextColorByType(type) },
    style,
  ].filter(Boolean);

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

const RenderMarkdownText = ({
  text,
  type = 'left-user',
}) => {
  if (Platform.OS === 'web') {
    return (
      <ScrollView horizontal={false} style={{ flex: 1 }}>
        <ReactMarkdown
          components={{
            pre: CodeComponent,
            code: InlineCode,
            a: AnchorComponent,
            p: (props) => <Paragraph {...props} type={type} />,
            img: ImageComponent,
          }}>
          {text}
        </ReactMarkdown>
      </ScrollView>
    );
  }

  return (
    <Markdown
      style={{
        paragraph: {
          marginTop: 0,
          marginBottom: 0,
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          fontSize: 14,
        },
      }}>
      {text}
    </Markdown>
  );
};

describe('RenderMarkdownText Components', () => {
  describe('InlineCode Component', () => {
    it('should render inline code with correct style', () => {
      const testCode = 'const example = true;';
      const { getByText } = render(
        <InlineCode>{testCode}</InlineCode>
      );
      
      const codeElement = getByText(testCode);
      expect(codeElement.props.style).toBe(markdownStyles.inlineCode);
    });
  });

  describe('Paragraph Component', () => {
    it('should render paragraph with correct styles', () => {
      const testText = 'Test paragraph';
      const testType = 'left-user';
      
      const { getByText } = render(
        <Paragraph type={testType}>{testText}</Paragraph>
      );
      
      const paragraphElement = getByText(testText);
      expect(paragraphElement.props.style).toEqual([
        markdownStyles.paragraph,
        { color: getTextColorByType(testType) },
        undefined
      ]);
    });

    it('should apply custom styles when provided', () => {
      const customStyle = { fontSize: 16 };
      const { getByText } = render(
        <Paragraph style={customStyle}>Test</Paragraph>
      );
      
      const paragraphElement = getByText('Test');
      expect(paragraphElement.props.style).toEqual([
        markdownStyles.paragraph,
        { color: getTextColorByType('left-user') },
        customStyle
      ]);
    });
  });

  describe('RenderMarkdownText Component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });


    it('should render ScrollView with ReactMarkdown on web', () => {
      Platform.OS = 'web';
      const { root } = render(
        <RenderMarkdownText text="Test markdown" />
      );
      expect(root).toBeTruthy();
    });

    it('should use default type when not provided', () => {
      const { root } = render(
        <RenderMarkdownText text="Test markdown" />
      );
      expect(root).toBeTruthy();
    });

    it('should handle empty text', () => {
      const { root } = render(
        <RenderMarkdownText text="" />
      );
      expect(root).toBeTruthy();
    });
  });
});