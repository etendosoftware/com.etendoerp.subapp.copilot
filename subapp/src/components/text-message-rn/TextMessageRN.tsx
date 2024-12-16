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
import { RenderMarkdownText } from './MarkdownUtilsRN';
import { TextMessageProps } from './TextMessageRN.types';
import { FileIcon, XCircleFillIcon } from 'etendo-ui-library';
import { styles } from './TextMessageRN.styles';

const TextMessageRN: React.FC<TextMessageProps> = ({
  title,
  text,
  files,
  time,
  type,
  backgroundColor,
}) => {
  let computedBackgroundColor;
  if (type === 'error') {
    computedBackgroundColor = DANGER_100;
  } else if (type === 'right-user') {
    computedBackgroundColor = NEUTRAL_200;
  } else {
    computedBackgroundColor = backgroundColor || NEUTRAL_0;
  }

  const messageStyle: any = [
    styles.messageContainer,
    { borderTopLeftRadius: type === 'left-user' || type === 'error' ? 0 : 8 },
    { borderTopRightRadius: type === 'right-user' ? 0 : 8 },
    { backgroundColor: computedBackgroundColor },
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
          { color: type === 'error' ? DANGER_900 : NEUTRAL_1000 },
        ]}>
        {title}
      </Text>
    );
  };

  return (
    <View style={messageStyle}>
      {title && renderTitle(title, type)}

      {files && files.length > 0 && (
        <View
          style={[
            styles.fileContainer,
            type === 'right-user'
              ? styles.rightUserFileContainer
              : styles.otherUserFileContainer,
            files.length > 1 ? { minWidth: '75%' } : { width: 'auto' },
          ]}>
          <View style={styles.iconWrapper}>
            <FileIcon style={styles.fileIcon} />
            {files.length > 1 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{files.length}</Text>
              </View>
            )}
          </View>
          <View style={styles.fileContent}>
            {files.length === 1 ? (
              <Text
                style={styles.fileNameText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {files[0]?.name}
              </Text>
            ) : (
              <Text style={styles.fileNameText}>
                {`There are ${files.length} uploaded`}
              </Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.textContentWithIcon}>
        {type === 'error' && (
          <View style={styles.errorIconContainer}>
            <XCircleFillIcon
              style={{ height: 16, width: 16 }}
              fill={DANGER_700}
            />
          </View>
        )}
        <RenderMarkdownText text={text} type={type} />
      </View>

      {time && (
        <Text
          style={type === 'error' ? styles.errorTimestamp : styles.timestamp}>
          {time}
        </Text>
      )}
    </View>
  );
};

export default TextMessageRN;
