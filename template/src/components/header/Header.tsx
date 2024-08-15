import React from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';
import { Button } from 'etendo-ui-library';
import { HomeProps } from '../../interfaces';
import locale from '../../localization/locale';
import theme from '../../styles/theme';
import { BackIcon } from '../../assets/images/icons/BackIcon';
import copilot from '../../assets/images/copilot/copilot.png';

export const Header = ({ navigationContainer }: HomeProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image
          source={copilot}
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
