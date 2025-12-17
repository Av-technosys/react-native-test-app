/* eslint-disable @typescript-eslint/no-unused-vars */
import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { applyGlobalFont } from './src/utils/GlobalFont';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//mport Geocoder from "react-native-geocoding";
import RootStack from './src/navigation/rockStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

function App() {
  useEffect(() => {
    applyGlobalFont();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Provider store={store}>
           <PersistGate loading={null} persistor={persistor}>

          <StatusBar
            translucent={false}
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
          />

          <RootStack />
          </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
