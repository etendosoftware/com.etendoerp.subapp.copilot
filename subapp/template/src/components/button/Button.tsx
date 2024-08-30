import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NEUTRAL_50,
  PRIMARY_100,
  SECONDARY_300,
  TERTIARY_50,
  TERTIARY_800,
} from '../../styles/colors';
import { ButtonProps, ButtonStyleType, IconStyleProps } from './Button.types';
import { ButtonStyleVariant, styles } from './Button.styles';

const Button = ({
  text,
  onPress,
  fontSize = 16,
  typeStyle,
  disabled,
  width = 'auto',
  height,
  iconLeft,
  iconRight,
  paddingHorizontal = 12,
  paddingVertical = 12,
  loading = false,
  metadata,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getHoveredBackgroundColor = (backgroundColor: ButtonStyleType) => {
    switch (backgroundColor) {
      case 'primary':
        return TERTIARY_800;
      case 'secondary':
        return SECONDARY_300;
      case 'terciary':
        return TERTIARY_50;
      case 'whiteBorder':
        return PRIMARY_100;
    }
  };

  const getHoveredTextColorAndViewColor = (typeStyle: ButtonStyleType) => {
    switch (typeStyle) {
      case 'white':
        return TERTIARY_800;
      case 'whiteBorder':
        return NEUTRAL_50;
      case 'primary':
        return NEUTRAL_50;
      default:
        return PRIMARY_100;
    }
  };

  const stateStyleContainer = (pressed: boolean) => {
    if (disabled) {
      return ButtonStyleVariant[typeStyle].containerDisabled;
    }
    if (pressed && !isHovered && !loading && typeStyle === 'whiteBorder') {
      return {
        ...ButtonStyleVariant[typeStyle].container,
        opacity: 0.7,
        backgroundColor: 'transparent',
      };
    }
    if (pressed && !loading) {
      const hoveredBackgroundColor = getHoveredBackgroundColor(typeStyle);
      return {
        ...ButtonStyleVariant[typeStyle].container,
        opacity: 0.7,
        backgroundColor: hoveredBackgroundColor,
      };
    }
    if (isHovered && !loading) {
      const hoveredBackgroundColor = getHoveredBackgroundColor(typeStyle);
      return {
        ...ButtonStyleVariant[typeStyle].container,
        backgroundColor: hoveredBackgroundColor,
      };
    }
    return ButtonStyleVariant[typeStyle].container;
  };
  const handleHoverIn = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  const stateStyleText = () => {
    if (loading && !iconLeft && !iconRight) {
      return { color: 'transparent' };
    }
    if (disabled) {
      return ButtonStyleVariant[typeStyle].textDisabled;
    }
    if (isHovered && !loading) {
      const hoveredTextColor = getHoveredTextColorAndViewColor(typeStyle);
      if (hoveredTextColor) {
        return {
          ...ButtonStyleVariant[typeStyle].text,
          color: hoveredTextColor,
        };
      }
    }
    return ButtonStyleVariant[typeStyle].text;
  };

  const stateStyleIcon = () => {
    if (disabled) {
      return ButtonStyleVariant[typeStyle].imageDisabled;
    }
    if (isHovered && !loading) {
      return isHovered
        ? getHoveredTextColorAndViewColor(typeStyle)
        : ButtonStyleVariant[typeStyle]?.imageColor;
    }
    return ButtonStyleVariant[typeStyle]?.imageColor;
  };

  const stateSizeIndicator = (iconComponent: React.ReactElement) => {
    if (iconComponent?.props?.style?.height) {
      return iconComponent?.props?.style?.height;
    }
    if (iconComponent?.props?.style?.width) {
      return iconComponent?.props?.style?.width;
    }
    return 16;
  };

  const renderIcon = (
    icon?: React.ReactElement,
    { marginRight = 0, marginLeft = 0 }: IconStyleProps = {},
  ) => {
    if (!icon) return null;

    const iconSize = stateSizeIndicator(icon);
    const iconColor = stateStyleIcon();

    if (loading) {
      return (
        <ActivityIndicator
          size={iconSize}
          color={iconColor}
          style={{ marginRight, marginLeft }}
        />
      );
    }

    return (
      <View style={{ marginRight, marginLeft }}>
        {React.cloneElement(icon, {
          style: {
            width: icon?.props?.style?.width || 16,
            height: icon?.props?.style?.height || 16,
          },
          fill: icon?.props?.fill || iconColor,
        })}
      </View>
    );
  };

  const handleOnPress = () => {
    onPress && (metadata ? onPress(metadata) : onPress());
  };
  return (
    <TouchableOpacity disabled={disabled ?? loading}>
      <Pressable
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        style={({ pressed }) => [
          stateStyleContainer(pressed),
          { height, width, paddingHorizontal, paddingVertical },
        ]}
        disabled={disabled ?? loading}
        onPress={handleOnPress}>
        {renderIcon(iconLeft, {
          marginRight: iconLeft && text ? 8 : 0,
        })}
        {loading && !iconLeft && !iconRight && (
          <ActivityIndicator
            size={fontSize}
            color={stateStyleIcon()}
            style={styles.indicatorCenterStyle}
          />
        )}
        <Text style={[stateStyleText(), { fontSize }]}>{text}</Text>
        {renderIcon(iconRight, {
          marginLeft: iconRight && text ? 8 : 0,
        })}
      </Pressable>
    </TouchableOpacity>
  );
};

export default Button;
