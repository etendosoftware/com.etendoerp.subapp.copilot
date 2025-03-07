import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';
import { ArrowLeftIcon, Button } from 'etendo-ui-library';
import { IHomeProps } from '../../interfaces';
import locale from '../../localization/locale';
import theme from '../../styles/theme';
import copilot from '../../assets/images/copilot/copilot.png';

export const Header = ({ navigationContainer }: IHomeProps) => {
  const [currentLanguage, setCurrentLanguage] = useState(locale.locale);

  useEffect(() => {
    setCurrentLanguage(locale.locale);
  }, []);

  const handleGoBack = () => {
    if (currentLanguage && locale.locale !== currentLanguage) {
      locale.locale = currentLanguage;
    }
    navigationContainer.goBack();
  };

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
        iconLeft={<ArrowLeftIcon fill={theme.colors.palette.dynamicColor.dark} />}
        onPress={handleGoBack} // Usar la función personalizada
      />
    </View>
  );
};

export default Header;
