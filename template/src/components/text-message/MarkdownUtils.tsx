import React from 'react';
import { Text, ScrollView, Platform } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { getTextColorByType } from './TextMessage.utils';
import { styleMarkdown, styles as markdownStyles } from './MarkdownUtils.styles';
import { TextMessageProps } from './TextMessage.types';

let ReactMarkdown: any;
let CodeComponent: any;
let AnchorComponent: any;
let ImageComponent: any;

const InlineCode = ({ children }: any) => (
  <Text style={markdownStyles.inlineCode}>{children}</Text>
);

const Paragraph = ({ children, type, ...props }: any) => {
  return (
    <Text
      style={[
        markdownStyles.paragraph,
        { color: getTextColorByType(type) },
        props.style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

// Component to render markdown text
export const RenderMarkdownText: React.FC<TextMessageProps> = ({
  text,
  type = 'left-user',
}) => {
  return Platform.OS === 'web' ? (
    <ScrollView horizontal={false} style={{ flex: 1 }}>
      <ReactMarkdown
        components={{
          pre: CodeComponent,
          code: InlineCode,
          a: AnchorComponent,
          p: ({ node, ...props }) => <Paragraph {...props} type={type} />,
          img: ImageComponent,
        }}>
        {text}
      </ReactMarkdown>
    </ScrollView>
  ) : (
    <Markdown style={{
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
