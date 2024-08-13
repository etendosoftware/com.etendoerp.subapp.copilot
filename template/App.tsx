import React from 'react';
import Home from './src/screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import locale from './src/localization/locale';
import { HomeProps } from './src/interfaces';

const App = ({ language, navigationContainer }: HomeProps) => {
  const Stack = createStackNavigator();

  locale.init();
  locale.setCurrentLanguage(locale.formatLanguageUnderscore(language));

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home">
        {props => <Home {...props} navigationContainer={navigationContainer} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export { App };
export default App;