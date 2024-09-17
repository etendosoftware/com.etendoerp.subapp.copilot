import React from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';
import { Button } from 'etendo-ui-library';
import { IHomeProps } from '../../interfaces';
import locale from '../../localization/locale';
import theme from '../../styles/theme';
import { BackIcon } from '../../assets/icons/BackIcon';
import copilot from '../../assets/images/copilot/copilot.png';

export const Header = ({ navigationContainer }: IHomeProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image
          source={{ uri: copilot }}
          style={styles.icon}
        />
        <Text style={styles.headerText}>{locale.t('Home.copilot')}</Text>
      </View>
      <Button
        typeStyle={'terciary'}
        text={locale.t('Home.back')}
        iconLeft={<BackIcon fill={theme.colors.palette.dynamicColor.dark} />}
        onPress={() => {
          navigationContainer.navigate('Home');
        }}
      />
    </View>
  );
}

export default Header;
