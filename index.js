/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {store} from 'src/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    secondary: 'yellow',
  },
};

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
