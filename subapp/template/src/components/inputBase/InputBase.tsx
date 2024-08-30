import {
  ColorValue,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  heightTextInput,
  paddingHorizontalTextInput,
  paddingTopTextInputMultiline,
  styles,
} from './InputBase.styles';
import { IInputBase } from './InputBase.types';
import { DANGER_700, NEUTRAL_500, PRIMARY_100 } from '../../styles/colors';
import { cursorPointer } from '../../helpers/table_utils';
import { GridContainer } from '../containers/gridContainer';

const InputBase = ({
  value,
  placeholder,
  title,
  helperText,
  isDisabled,
  isError,
  onChangeText,
  icon,
  rightButtons,
  onPress,
  onFocus,
  onBlur,
  onSubmitEditing,
  onKeyPress,
  secureTextEntry,
  keyboardType = 'default',
  styleContainer,
  isFocusable = true,
  refInputContainer,
  refInput,
  multiline,
  numberOfLines = 1,
}: IInputBase) => {
  const isEditable: boolean = onPress ? false : !isDisabled;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState<number>(heightTextInput);
  const [currentLines, setCurrentLines] = useState<number>(1);
  const inputFocusPadding = isFocused ? 2 : 0;
  const inputFocusPaddingTextHorizontal = isFocused ? 10 : 12;
  const inputFocusPaddingTextVertical = isFocused ? 6 : 8;
  const inputFocusPaddingTextHight = isFocused ? 6 : 2;
  const paddingVertical: number = inputFocusPadding;
  const paddingHorizontal: number = inputFocusPadding;

  const onFocusChange = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!isDisabled && isFocusable) {
      if (onFocus) {
        onFocus(e);
      }
      setIsFocused(true);
    }
  };

  const onBlurChange = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const determineColor = (icon?: boolean) => {
    if (icon) {
      return iconColorStyle();
    }
    if (isDisabled) {
      return NEUTRAL_500;
    }
    return isError ? DANGER_700 : PRIMARY_100;
  };

  const textColorStyle = (): ColorValue => {
    if (!value || isDisabled) {
      return NEUTRAL_500;
    }

    if (isFocused) {
      return PRIMARY_100;
    }
    if (isError && !isFocused) {
      return DANGER_700;
    }
    return PRIMARY_100;
  };

  const iconColorStyle = (): ColorValue => {
    if (isDisabled) {
      return NEUTRAL_500;
    }

    if (isFocused) {
      return PRIMARY_100;
    }
    if (isError && !isFocused) {
      return DANGER_700;
    }
    return PRIMARY_100;
  };

  const textInputStyle = [styles.textInput, { color: textColorStyle() }];

  if (Platform.OS === 'web') {
    textInputStyle.push({ outlineWidth: 0 } as any);
  }

  const handleChange = (string: string) => {
    if (onChangeText) {
      if (
        ['numeric', 'number-pad', 'phone-pad', 'decimal-pad'].includes(
          keyboardType,
        )
      ) {
        const regexNumber = /^[\d.,\/]*$/;
        if (regexNumber.test(string) || string === '') {
          onChangeText(string);
        }
      } else {
        onChangeText(string);
      }
    }
  };

  const determineIconStyles = (icon: any, disable?: boolean) => {
    if (!icon) return null;
    const { style = {}, ...otherIconProps } = icon.props;
    return React.cloneElement(icon, {
      fill: disable ? NEUTRAL_500 : determineColor(true),
      style: {
        ...style,
        height: style.height || styles.icon.height,
        width: style.width || styles.icon.width,
      },
      ...otherIconProps,
    });
  };

  const alignIcons = (): 'center' | 'flex-end' => {
    if (currentLines > 2 && multiline) {
      return 'flex-end';
    }
    return 'center';
  };
  const handleContentSizeChange = (event: any) => {
    const { height } = event.nativeEvent.contentSize;
    const lineHeight = styles.textInput.lineHeight;
    const newLineCount = Math.floor(height / lineHeight);
    if (newLineCount > numberOfLines) {
      return;
    }
    setCurrentLines(newLineCount);
    if (newLineCount > 1) {
      setInputHeight(lineHeight * newLineCount);
    }
  };

  const addPaddingTop = () => {
    if (multiline) return paddingTopTextInputMultiline - inputFocusPadding;
  };

  const addPaddingHorizontalTextInput = () => {
    if (!icon) {
      return inputFocusPaddingTextHorizontal;
    }
    return paddingHorizontalTextInput;
  };

  const handleOnPress = () => {
    if (onPress && !isDisabled) {
      onPress();
    }
  };

  const determineFocusBackgroundColor = (): ColorValue => {
    return isFocused ? determineColor() : 'transparent';
  };

  return (
    <>
      {!!title && (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.title, { color: determineColor() }]}>
          {title}
        </Text>
      )}
      <View
        ref={refInputContainer}
        style={[
          styles.container,
          {
            paddingHorizontal,
            paddingVertical,
            borderColor: determineColor(),
            backgroundColor: determineFocusBackgroundColor(),
            height: inputHeight,
            maxHeight: inputHeight,
            ...styleContainer,
          },
        ]}>
        <Pressable style={styles.containerInput} onPress={handleOnPress}>
          {!!icon && (
            <View
              style={[
                styles.iconContainer,
                {
                  justifyContent: alignIcons(),
                  paddingVertical: inputFocusPaddingTextVertical,
                  paddingLeft: inputFocusPaddingTextHorizontal,
                },
              ]}>
              {React.cloneElement(icon, {
                style: styles.icon,
                fill: determineColor(true),
              })}
            </View>
          )}
          <TextInput
            onPressIn={handleOnPress}
            ref={refInput}
            value={value}
            onChangeText={handleChange}
            placeholder={placeholder}
            editable={isEditable}
            onFocus={onFocusChange}
            onBlur={onBlurChange}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onKeyPress={onKeyPress}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onContentSizeChange={handleContentSizeChange}
            style={[
              textInputStyle,
              onPress && cursorPointer(),
              {
                paddingHorizontal: addPaddingHorizontalTextInput(),
              },
            ]}
          />
          {!!rightButtons && (
            <GridContainer
              gapHorizontal={12}
              gapVertical={0}
              stylesContainer={[
                styles.gridContainer,
                {
                  alignItems: alignIcons(),
                  paddingVertical: inputFocusPaddingTextVertical,
                  paddingRight: inputFocusPaddingTextHorizontal,
                },
              ]}
              components={rightButtons.map((ButtonComponent: any, index) => {
                const { iconLeft, iconRight, ...otherProps } =
                  ButtonComponent.props;
                const modifiedProps = { ...otherProps };
                modifiedProps.paddingVertical =
                  modifiedProps?.paddingVertical || 6;
                modifiedProps.paddingHorizontal =
                  modifiedProps?.paddingHorizontal || 0;
                modifiedProps.iconLeft = determineIconStyles(
                  iconLeft,
                  modifiedProps.disabled || isDisabled,
                );
                modifiedProps.iconRight = determineIconStyles(
                  iconRight,
                  modifiedProps.disabled || isDisabled,
                );
                modifiedProps.text = '';
                return (
                  <ButtonComponent.type
                    {...modifiedProps}
                    key={index}
                    disabled={isDisabled || modifiedProps.disabled}
                    typeStyle={'white'}
                  />
                );
              })}
            />
          )}
        </Pressable>
      </View>
      {!!helperText && (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.helperText, { color: determineColor() }]}>
          {helperText}
        </Text>
      )}
    </>
  );
};

export default InputBase;
