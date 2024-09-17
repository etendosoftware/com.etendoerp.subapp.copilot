import React from 'react';
import { View, Text } from 'react-native';
import {
  DANGER_100,
  DANGER_700,
  DANGER_900,
  NEUTRAL_0,
  NEUTRAL_1000,
  NEUTRAL_200,
} from '../../styles/colors';
import { XCircleFillIcon } from '../../assets/images/icons/XCircleFillIcon';
import { RenderMarkdownText } from './MarkdownUtils';
import { TextMessageProps } from './TextMessage.types';
import { FileIcon } from '../../assets/images/icons/FileIcon';
import { styles } from './TextMessage.styles';

// TextMessage component definition
const TextMessage: React.FC<TextMessageProps> = ({
  title,
  text,
  file,
  time,
  type,
  backgroundColor,
}) => {
  const messageStyle: any = [
    styles.messageContainer,
    { borderTopLeftRadius: type === 'left-user' || type === 'error' ? 0 : 8 },
    { borderTopRightRadius: type === 'right-user' ? 0 : 8 },
    {
      backgroundColor:
        type === 'error'
          ? DANGER_100
          : type === 'right-user'
            ? NEUTRAL_200
            : backgroundColor || NEUTRAL_0,
    },
    { alignSelf: type === 'right-user' ? 'flex-end' : 'flex-start' },
  ];

  const renderTitle = (
    title: string,
    type: 'left-user' | 'right-user' | 'error' | undefined,
  ) => {
    return (
      <Text
        style={[
          styles.title,
          { color: type == 'error' ? DANGER_900 : NEUTRAL_1000 },
        ]}>
        {title}
      </Text>
    );
  };

  return (
    <View style={messageStyle}>
      {/* Optionally display title if it exists */}
      {title && renderTitle(title, type)}

      {/* Optionally display file name if it exists */}
      {file && (
        <View
          style={[
            styles.fileContainer,
            type === 'right-user'
              ? styles.rightUserFileContainer
              : styles.otherUserFileContainer,
          ]}>
          <FileIcon style={styles.fileIcon} />
          <Text style={styles.file} numberOfLines={1} ellipsizeMode='tail'>{file}</Text>
        </View>
      )}

      {/* Container for the error icon and the text */}
      <View style={styles.textContentWithIcon}>
        {type === 'error' && (
          <View style={styles.errorIconContainer}>
            <XCircleFillIcon
              style={{ height: 16, width: 16 }}
              fill={DANGER_700}
            />
          </View>
        )}
        {/* Render the markdown text */}
        <RenderMarkdownText text={text} type={type} />
      </View>

      {/* Optionally display timestamp if it exists, always below the text */}
      {time && (
        <Text
          style={type === 'error' ? styles.errorTimestamp : styles.timestamp}>
          {time}
        </Text>
      )}
    </View>
  );
};

export default TextMessage;
