import React from 'react';
import Home from './src/screens/home';
import { createStackNavigator } from '@react-navigation/stack';
import locale from './src/localization/locale';
import { Global } from './lib/GlobalConfig';
import { IData, INavigationContainerProps } from './src/interfaces';

interface AppProps {
  language: string;
  dataUser: IData;
  navigationContainer: INavigationContainerProps;
  token: string;
  url: string;
  contextPathUrl: string;
}

const App = ({
  language,
  navigationContainer,
  dataUser,
  token,
  url,
  contextPathUrl,
}: AppProps) => {
  const Stack = createStackNavigator();

  locale.init();
  locale.setCurrentLanguage(locale.formatLanguageUnderscore(language));

  Global.url = url;
  Global.token = token;
  Global.contextPathUrl = contextPathUrl;

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home" initialParams={{ dataUser }}>
        {props => <Home {...props} navigationContainer={navigationContainer} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export { App };
export default App;
