import React, { ReactElement } from 'react';
import InputBase from '../InputBase';
import {
  CheckCircleFillIcon,
  XCircleFillIcon,
} from 'etendo-ui-library';
import { ITextInput } from './TextInput.types';
import { DANGER_600, NEUTRAL_500, SUCCESS_600 } from '../../../styles/colors';
import { View } from 'react-native';
import { styles } from './TextInput.style';
import { SvgImageProps } from '../InputBase.types';

const TextInput = ({
  validation = 'none',
  rightButtons,
  isDisabled,
  ...inputBaseProps
}: ITextInput) => {
  const getValidation = ():
    | ReactElement<any>[]
    | undefined => {
    let icons: ReactElement<ButtonProps | SvgImageProps>[] = [];

    if (validation === 'success') {
      icons.push(
        <View style={styles.iconContainer}>
          <CheckCircleFillIcon
            fill={isDisabled ? NEUTRAL_500 : SUCCESS_600}
            style={styles.icon}
          />
        </View>,
      );
    } else if (validation === 'error') {
      icons.push(
        <View style={styles.iconContainer}>
          <XCircleFillIcon
            fill={isDisabled ? NEUTRAL_500 : DANGER_600}
            style={styles.icon}
          />
        </View>,
      );
    }

    if (rightButtons?.length) {
      icons.push(...rightButtons);
    }
    return icons?.length ? icons : undefined;
  };

  return (
    <InputBase
      {...inputBaseProps}
      isDisabled={isDisabled}
      rightButtons={getValidation()}
    />
  );
};

export default TextInput;
